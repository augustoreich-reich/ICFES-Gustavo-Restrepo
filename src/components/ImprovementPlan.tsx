import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  Sliders,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { AREAS_DATA, AreaData } from '../data/icfesData';
import { generatePedagogicalAdvice } from '../services/aiPedagogicalService';

interface ImprovementPlanProps {
  selectedAreaId: string;
  onSelectArea: (areaId: string) => void;
}

export const ImprovementPlan: React.FC<ImprovementPlanProps> = ({
  selectedAreaId,
  onSelectArea,
}) => {
  // If global is selected, default to 'matematicas' (the area with highest urgency) or allow choosing
  const effectiveAreaId = selectedAreaId === 'global' ? 'matematicas' : selectedAreaId;
  const area: AreaData = AREAS_DATA[effectiveAreaId] || AREAS_DATA.matematicas;

  // Simulator states
  const [targetLevel1Reduction, setTargetLevel1Reduction] = useState<number>(5); // Reduce Nivel 1 by 5%
  const [targetLevel3Increase, setTargetLevel3Increase] = useState<number>(10); // Increase Nivel 3 by 10%

  // AI Assistant states
  const [promptTopic, setPromptTopic] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const lastCohort = area.historico[area.historico.length - 1];
  const currentEE = lastCohort.promedio.ee;

  // Simulator calculations
  // Shifting 1% of students from Level 1 (avg 30 pts) to Level 3 (avg 60 pts) adds ~0.3 pts to the area average
  // Shifting 1% of students from Level 2 (avg 45 pts) to Level 3 (avg 60 pts) adds ~0.15 pts to the area average
  const projectedAreaScore = Math.min(
    100,
    Math.round(currentEE + targetLevel1Reduction * 0.35 + targetLevel3Increase * 0.2)
  );
  const globalImpact = Math.round((projectedAreaScore - currentEE) * 0.2 * 5); // Global is 5 areas weighted

  const handleGenerateAI = async (customTopic?: string) => {
    const topicToUse = customTopic || promptTopic || `Mejoramiento curricular en ${area.nombre}`;
    setIsGenerating(true);
    setGeneratedPlan(null);
    try {
      const result = await generatePedagogicalAdvice(effectiveAreaId, topicToUse);
      setGeneratedPlan(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedPlan) {
      navigator.clipboard.writeText(generatedPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <Target className="w-4 h-4" />
              <span>Plan de Mejoramiento Institucional (PMI)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Análisis de lo que se puede Mejorar: {area.nombre}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Recomendaciones pedagógicas basadas en la evidencia empírica de los reportes históricos ICFES
            </p>
          </div>

          {/* Quick Area Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Cambiar área:</span>
            <select
              value={effectiveAreaId}
              onChange={(e) => onSelectArea(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(AREAS_DATA).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre} ({a.historico[a.historico.length - 1].promedio.ee} pts)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Pillars of Diagnosis from PDF documents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fortalezas Identificadas</span>
            </div>
            <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside">
              {area.diagnosticoGeneral.puntosFuertes.map((pf, idx) => (
                <li key={idx} className="leading-relaxed">
                  {pf}
                </li>
              ))}
            </ul>
          </div>

          {/* Urgent Challenges */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Retos Críticos a Resolver</span>
            </div>
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside">
              {area.diagnosticoGeneral.retosUrgentes.map((ru, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ru}
                </li>
              ))}
            </ul>
          </div>

          {/* Patterns in the classroom */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>Patrón Detectado en el Aula</span>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              {area.diagnosticoGeneral.patronesDetectados[0]}
            </p>
            <div className="pt-1 text-[11px] font-semibold text-blue-700">
              Meta Trienio: {area.diagnosticoGeneral.metaTrienio}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive PMI Goal Simulator */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Simulador Interactivo de Metas de Mejoramiento
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Calcula cómo impactaría al puntaje del área y del colegio si rescatamos estudiantes de niveles básicos hacia niveles satisfactorios
            </p>
          </div>

          <button
            onClick={() => {
              setTargetLevel1Reduction(5);
              setTargetLevel3Increase(10);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer simulación</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Sliders */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Reducción Nivel 1 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Reducir estudiantes en {area.id === 'ingles' ? 'Nivel A-' : 'Nivel 1 (Insuficiente)'}:
                </span>
                <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  -{targetLevel1Reduction}% de estudiantes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={targetLevel1Reduction}
                onChange={(e) => setTargetLevel1Reduction(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% (Sin cambio)</span>
                <span>-5% (Meta viable)</span>
                <span>-15% (Transformación profunda)</span>
              </div>
            </div>

            {/* Slider 2: Incremento Nivel 3 y 4 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Elevar estudiantes a {area.id === 'ingles' ? 'Nivel A2 / B1' : 'Nivel 3 (Satisfactorio)'}:
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +{targetLevel3Increase}% de estudiantes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={targetLevel3Increase}
                onChange={(e) => setTargetLevel3Increase(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% (Sin cambio)</span>
                <span>+10% (Meta anual)</span>
                <span>+25% (Salto de categoría)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
              <strong>Principio pedagógico del ICFES:</strong> En la metodología de pruebas estandarizadas, el mayor salto de puntaje no se logra presionando a los alumnos sobresalientes, sino <em>cerrando la brecha de los estudiantes en rezago crítico</em>.
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 space-y-4 shadow-md">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Proyección de Resultados Simulados
            </span>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="text-xs text-slate-400">Puntaje {area.nombreCorto}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {projectedAreaScore}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    +{projectedAreaScore - currentEE} pts
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Puntaje actual: {currentEE} pts
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Puntaje Global Colegio</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {259 + globalImpact}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    +{globalImpact} pts
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Puntaje actual: 259 / 500
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 text-xs text-slate-300 flex items-center justify-between">
              <span>Posición territorial estimada:</span>
              <span className="font-semibold text-emerald-300">
                Supera a colegios oficiales urbanos de Bogotá
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Pedagogical Plan Generator (Gemini + Curated Assistant) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900">
                Asistente Pedagógico para Docentes: Planes de Acción y Secuencias
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Genera secuencias didácticas de aula, rúbricas y estrategias de refuerzo adaptadas a las dificultades de tu materia
            </p>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700">
            Temas frecuentes de mejoramiento (haz clic para consultar):
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              `Estrategias para formular problemas cotidianos en ${area.nombreCorto}`,
              `Cómo trabajar contraejemplos y justificaciones en el aula`,
              `Taller de lectura de gráficos e infografías para grado 11°`,
              `Plan de rescate para estudiantes en nivel insuficiente`,
              `Construcción de preguntas tipo Saber 11 con retroalimentación formativa`,
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptTopic(chip);
                  handleGenerateAI(chip);
                }}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder={`Escribe un reto de aula para ${area.nombre} (ej. "¿Cómo enseñar proporcionalidad sin fórmulas mecánicas?")...`}
            value={promptTopic}
            onChange={(e) => setPromptTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
            className="flex-1 text-xs border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleGenerateAI()}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Generando plan pedagógico...' : 'Generar Plan de Aula'}</span>
          </button>
        </div>

        {/* Generated Plan Output */}
        {generatedPlan && (
          <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Plan Pedagógico Generado con Éxito</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans space-y-3">
              {generatedPlan}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
