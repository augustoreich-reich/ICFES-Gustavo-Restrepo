import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  AREAS_DATA,
  AreaData,
  AreaHistoryRecord,
} from '../data/icfesData';

interface AreaDeepDiveProps {
  areaId: string;
  onSelectArea: (areaId: string) => void;
  periodFilter: 'all' | 'reciente' | 'medio' | 'base';
  onNavigateToTab: (tab: 'general' | 'mi_area' | 'mejoras' | 'guia' | 'ficha') => void;
}

export const AreaDeepDive: React.FC<AreaDeepDiveProps> = ({
  areaId,
  onSelectArea,
  periodFilter,
  onNavigateToTab,
}) => {
  const area: AreaData = AREAS_DATA[areaId] || AREAS_DATA.lectura_critica;
  const [selectedLearningIndex, setSelectedLearningIndex] = useState<number>(0);
  const [selectedCohortIndex, setSelectedCohortIndex] = useState<number>(area.historico.length - 1);

  // Filter cohort history according to period filter
  const filteredHistorico = area.historico.filter((h) => {
    if (periodFilter === 'reciente') return ['2024-3', '2025-3', '2026-3'].includes(h.period);
    if (periodFilter === 'medio') return ['2021-4', '2022-4', '2023-4'].includes(h.period);
    if (periodFilter === 'base') return ['2018-2', '2019-4', '2020-4'].includes(h.period);
    return true;
  });

  const latest = area.historico[area.historico.length - 1];
  const previous = area.historico[area.historico.length - 2];
  const diffPrevious = latest.promedio.ee - previous.promedio.ee;
  const diffCol = latest.promedio.ee - latest.promedio.colombia;
  const diffEtc = latest.promedio.ee - latest.promedio.etc;

  // Calculate percentage of students in satisfactory or advanced levels
  const isIngles = area.id === 'ingles';
  const satisfactoryPct = isIngles
    ? (latest.niveles['A2'] || 0) + (latest.niveles['B1'] || 0) + (latest.niveles['B+'] || 0)
    : (latest.niveles['3'] || 0) + (latest.niveles['4'] || 0);

  const riskPct = isIngles
    ? latest.niveles['A-'] || 0
    : latest.niveles['1'] || 0;

  // Selected cohort for level distribution detail
  const activeCohort = filteredHistorico[selectedCohortIndex] || latest;

  return (
    <div className="space-y-8">
      {/* Area Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: area.color }}
              ></span>
              <span>Diagnóstico Específico de Asignatura</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-slate-700">Escala {area.escala} Pts</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{area.nombre}</span>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-mono font-semibold"
                style={{ backgroundColor: `${area.color}15`, color: area.color }}
              >
                Promedio actual: {latest.promedio.ee} pts
              </span>
            </h2>

            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {area.descripcionAmigable}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateToTab('mejoras')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver Plan de Acción Pedagógico</span>
            </button>
          </div>
        </div>

        {/* What does the exam evaluate? (3 human bullets) */}
        <div className="mt-4 pt-2">
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Habilidades y competencias clave evaluadas por el ICFES en esta prueba:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {area.queEvalua.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-xs text-slate-700 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 4 Key Metric Cards for the Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Average Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Puntaje Promedio ({latest.period})</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {latest.promedio.ee}
            </span>
            <span className="text-xs text-slate-500">/ 100 puntos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Vs cohorte anterior:</span>
            <span
              className={`font-mono font-semibold inline-flex items-center gap-0.5 ${
                diffPrevious >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {diffPrevious >= 0 ? '+' : ''}{diffPrevious} pts
              {diffPrevious >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            </span>
          </div>
        </div>

        {/* Metric 2: Comparison vs Colombia & ETC */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Comparación Territorial</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono tabular-nums ${diffCol >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {diffCol >= 0 ? `+${diffCol}` : diffCol}
            </span>
            <span className="text-xs text-slate-500">pts vs Colombia</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Bogotá ETC: {latest.promedio.etc} pts</span>
            <span className={`font-mono font-semibold ${diffEtc >= 0 ? 'text-emerald-700' : 'text-slate-600'}`}>
              Brecha: {diffEtc} pts
            </span>
          </div>
        </div>

        {/* Metric 3: Desviación Estándar (Brecha Interna) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Desviación Estándar</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {latest.desviacion.ee}
            </span>
            <span className="text-xs text-slate-500">puntos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Nivel de heterogeneidad:</span>
            <span className="font-semibold text-slate-700">
              {latest.desviacion.ee <= 8 ? 'Baja (Parejos)' : latest.desviacion.ee <= 10 ? 'Media' : 'Alta dispersión'}
            </span>
          </div>
        </div>

        {/* Metric 4: % Satisfactory or Advanced */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">
            {isIngles ? 'Nivel A2 o Superior' : 'Nivel 3 o 4 (Satisfactorio)'}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {satisfactoryPct}%
            </span>
            <span className="text-xs text-slate-500">de los alumnos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Rezago ({isIngles ? 'A-' : 'Nivel 1'}):</span>
            <span className={`font-mono font-bold ${riskPct > 10 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {riskPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Historical Trend Line Chart for this Area */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Evolución del Puntaje Promedio: {area.nombre}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trayectoria histórica del Gustavo Restrepo frente al promedio nacional (Colombia) y distrital (Bogotá ETC)
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Media Nacional Estándar: <strong className="text-slate-800">50 pts</strong> (Desviación: 10)
          </div>
        </div>

        {/* Area Line Chart SVG */}
        <div className="mt-6">
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 220" preserveAspectRatio="none">
              {/* Reference Grid (40, 45, 50, 55, 60, 65) */}
              {[40, 45, 50, 55, 60, 65].map((val) => {
                const y = 220 - ((val - 40) / (65 - 40)) * 200;
                return (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={y}
                      x2="780"
                      y2={y}
                      stroke={val === 50 ? '#cbd5e1' : '#f1f5f9'}
                      strokeDasharray={val === 50 ? 'none' : '4 4'}
                      strokeWidth={val === 50 ? '1.5' : '1'}
                    />
                    <text
                      x="32"
                      y={y + 4}
                      textAnchor="end"
                      className={`text-[10px] font-mono tabular-nums ${
                        val === 50 ? 'fill-slate-700 font-bold' : 'fill-slate-400'
                      }`}
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Bogotá ETC Line */}
              {(() => {
                const points = filteredHistorico.map((h, i) => {
                  const x = 50 + (i / (filteredHistorico.length - 1 || 1)) * 710;
                  const score = h.promedio.etc;
                  const y = 220 - ((score - 40) / (65 - 40)) * 200;
                  return `${x},${y}`;
                });
                return (
                  <polyline
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    points={points.join(' ')}
                  />
                );
              })()}

              {/* Colombia Line */}
              {(() => {
                const points = filteredHistorico.map((h, i) => {
                  const x = 50 + (i / (filteredHistorico.length - 1 || 1)) * 710;
                  const score = h.promedio.colombia;
                  const y = 220 - ((score - 40) / (65 - 40)) * 200;
                  return `${x},${y}`;
                });
                return (
                  <polyline
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    points={points.join(' ')}
                  />
                );
              })()}

              {/* EE Line (Gustavo Restrepo) */}
              {(() => {
                const points = filteredHistorico.map((h, i) => {
                  const x = 50 + (i / (filteredHistorico.length - 1 || 1)) * 710;
                  const score = h.promedio.ee;
                  const y = 220 - ((score - 40) / (65 - 40)) * 200;
                  return `${x},${y}`;
                });
                return (
                  <>
                    <polyline
                      fill="none"
                      stroke={area.color}
                      strokeWidth="3.5"
                      points={points.join(' ')}
                    />
                    {filteredHistorico.map((h, i) => {
                      const x = 50 + (i / (filteredHistorico.length - 1 || 1)) * 710;
                      const score = h.promedio.ee;
                      const y = 220 - ((score - 40) / (65 - 40)) * 200;
                      return (
                        <g key={h.period}>
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            className="fill-white"
                            stroke={area.color}
                            strokeWidth="3"
                          />
                          <rect
                            x={x - 14}
                            y={y - 22}
                            width="28"
                            height="16"
                            rx="3"
                            className="fill-slate-900"
                          />
                          <text
                            x={x}
                            y={y - 11}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-white font-mono tabular-nums"
                          >
                            {score}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}

              {/* X Labels */}
              {filteredHistorico.map((h, i) => {
                const x = 50 + (i / (filteredHistorico.length - 1 || 1)) * 710;
                return (
                  <text
                    key={h.period}
                    x={x}
                    y="218"
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-500 font-mono tabular-nums"
                  >
                    {h.period}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 rounded-full inline-block" style={{ backgroundColor: area.color }}></span>
              <span className="font-semibold text-slate-800">Colegio Gustavo Restrepo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400 inline-block"></span>
              <span className="text-slate-600">Promedio Colombia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-300 inline-block"></span>
              <span className="text-slate-500">Bogotá D.C. (ETC)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Levels Breakdown (Stacked Bars & Evolution) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Distribución de Estudiantes por Niveles de Desempeño
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Porcentaje real de estudiantes en cada nivel a través de las cohortes (Oficial ICFES)
            </p>
          </div>

          {/* Educational interpretation rule from PDF */}
          <div className="bg-blue-50/60 border border-blue-200/60 rounded-lg px-3 py-1.5 text-xs text-blue-900 flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span>
              <strong>Meta pedagógica:</strong> Disminuir el segmento rojo (Nivel 1 / A-) y aumentar el segmento verde/azul (Nivel 3 y 4).
            </span>
          </div>
        </div>

        {/* Stacked Level Bars for all periods */}
        <div className="mt-6 space-y-4">
          <div className="text-xs font-semibold text-slate-700">
            Comparativa de Niveles a través de las aplicaciones evaluadas:
          </div>

          <div className="space-y-2.5">
            {filteredHistorico.map((h, idx) => {
              const niveles = h.niveles;
              return (
                <div
                  key={h.period}
                  onClick={() => setSelectedCohortIndex(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeCohort.period === h.period
                      ? 'border-blue-400 bg-blue-50/20 ring-1 ring-blue-300'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono">{h.period}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 font-mono">Promedio: {h.promedio.ee} pts</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Haz clic para ver detalle
                    </div>
                  </div>

                  {/* Stacked Bar Container */}
                  <div className="h-6 w-full rounded-md overflow-hidden flex font-mono text-[11px] font-bold text-white shadow-2xs">
                    {isIngles ? (
                      <>
                        {/* A- (Red) */}
                        <div
                          style={{ width: `${niveles['A-'] || 0}%` }}
                          className="bg-rose-500 flex items-center justify-center truncate px-1 transition-all"
                          title={`A- (Inferior a Principiante): ${niveles['A-']}%`}
                        >
                          {(niveles['A-'] || 0) >= 8 ? `A- ${niveles['A-']}%` : ''}
                        </div>
                        {/* A1 (Amber) */}
                        <div
                          style={{ width: `${niveles['A1'] || 0}%` }}
                          className="bg-amber-500 flex items-center justify-center truncate px-1 transition-all"
                          title={`A1 (Principiante): ${niveles['A1']}%`}
                        >
                          {(niveles['A1'] || 0) >= 8 ? `A1 ${niveles['A1']}%` : ''}
                        </div>
                        {/* A2 (Blue) */}
                        <div
                          style={{ width: `${niveles['A2'] || 0}%` }}
                          className="bg-blue-500 flex items-center justify-center truncate px-1 transition-all"
                          title={`A2 (Básico): ${niveles['A2']}%`}
                        >
                          {(niveles['A2'] || 0) >= 8 ? `A2 ${niveles['A2']}%` : ''}
                        </div>
                        {/* B1 (Emerald) */}
                        <div
                          style={{ width: `${niveles['B1'] || 0}%` }}
                          className="bg-emerald-600 flex items-center justify-center truncate px-1 transition-all"
                          title={`B1 (Pre-Intermedio): ${niveles['B1']}%`}
                        >
                          {(niveles['B1'] || 0) >= 6 ? `B1 ${niveles['B1']}%` : ''}
                        </div>
                        {/* B+ (Indigo) */}
                        <div
                          style={{ width: `${niveles['B+'] || 0}%` }}
                          className="bg-purple-700 flex items-center justify-center truncate px-1 transition-all"
                          title={`B+ (Avanzado): ${niveles['B+']}%`}
                        >
                          {(niveles['B+'] || 0) >= 4 ? `B+ ${niveles['B+']}%` : ''}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Nivel 1 (Red) */}
                        <div
                          style={{ width: `${niveles['1'] || 0}%` }}
                          className="bg-rose-500 flex items-center justify-center truncate px-1 transition-all"
                          title={`Nivel 1 (Insuficiente): ${niveles['1']}%`}
                        >
                          {(niveles['1'] || 0) >= 5 ? `N1: ${niveles['1']}%` : ''}
                        </div>
                        {/* Nivel 2 (Amber) */}
                        <div
                          style={{ width: `${niveles['2'] || 0}%` }}
                          className="bg-amber-500 flex items-center justify-center truncate px-1 transition-all"
                          title={`Nivel 2 (Mínimo): ${niveles['2']}%`}
                        >
                          {(niveles['2'] || 0) >= 7 ? `N2: ${niveles['2']}%` : ''}
                        </div>
                        {/* Nivel 3 (Emerald) */}
                        <div
                          style={{ width: `${niveles['3'] || 0}%` }}
                          className="bg-emerald-600 flex items-center justify-center truncate px-1 transition-all"
                          title={`Nivel 3 (Satisfactorio): ${niveles['3']}%`}
                        >
                          {(niveles['3'] || 0) >= 7 ? `N3: ${niveles['3']}%` : ''}
                        </div>
                        {/* Nivel 4 (Purple/Blue) */}
                        <div
                          style={{ width: `${niveles['4'] || 0}%` }}
                          className="bg-purple-700 flex items-center justify-center truncate px-1 transition-all"
                          title={`Nivel 4 (Avanzado): ${niveles['4']}%`}
                        >
                          {(niveles['4'] || 0) >= 4 ? `N4: ${niveles['4']}%` : ''}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Level Color Key / Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              {isIngles ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-500"></span>
                    <span className="text-slate-700">A- (Sub-Básico)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-500"></span>
                    <span className="text-slate-700">A1 (Principiante)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-500"></span>
                    <span className="text-slate-700">A2 (Básico)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-600"></span>
                    <span className="text-slate-700">B1 (Pre-Intermedio)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-700"></span>
                    <span className="text-slate-700">B+ (Intermedio Superior)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-500"></span>
                    <span className="text-slate-700 font-medium">Nivel 1 (Insuficiente)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-500"></span>
                    <span className="text-slate-700 font-medium">Nivel 2 (Mínimo)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-600"></span>
                    <span className="text-slate-700 font-medium">Nivel 3 (Satisfactorio)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-700"></span>
                    <span className="text-slate-700 font-medium">Nivel 4 (Avanzado)</span>
                  </div>
                </>
              )}
            </div>

            <div className="text-slate-400 font-mono text-[11px]">
              Suma = 100%
            </div>
          </div>
        </div>
      </div>

      {/* Evaluated Learnings & Incorrect Answers Radiography (from PDF Figure 3.4, 4.4, 5.4, 6.4) */}
      {area.aprendizajesEvaluados && area.aprendizajesEvaluados.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                  Radiografía Curricular
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Porcentaje Promedio de Respuestas Incorrectas por Aprendizaje
              </h3>
              <p className="text-xs text-slate-500">
                Datos oficiales del ICFES que revelan en cuáles tareas específicas cometen más fallas los estudiantes del colegio
              </p>
            </div>

            <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium self-start sm:self-auto">
              Mayor barra = Mayor dificultad
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List of Learnings with visual comparison bars */}
            <div className="lg:col-span-7 space-y-4">
              {area.aprendizajesEvaluados.map((ap, idx) => {
                const isSelected = selectedLearningIndex === idx;
                return (
                  <div
                    key={ap.id}
                    onClick={() => setSelectedLearningIndex(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/20 shadow-xs ring-1 ring-blue-400'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                          {ap.competencia}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {ap.descripcion}
                        </h4>
                      </div>

                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                          ap.porcentajeIncorrectasEE >= 60
                            ? 'bg-rose-100 text-rose-800'
                            : ap.porcentajeIncorrectasEE >= 45
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ap.porcentajeIncorrectasEE}% Error
                      </span>
                    </div>

                    {/* Comparison Bars (EE vs Colombia vs Bogotá ETC) */}
                    <div className="space-y-2 mt-3 text-xs">
                      {/* EE Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 mb-0.5">
                          <span className="font-semibold text-slate-800">Colegio Gustavo Restrepo</span>
                          <span className="font-mono font-bold text-slate-900">{ap.porcentajeIncorrectasEE}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              ap.porcentajeIncorrectasEE >= 60 ? 'bg-rose-600' : ap.porcentajeIncorrectasEE >= 45 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${ap.porcentajeIncorrectasEE}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Colombia Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                          <span>Colombia (Promedio nacional)</span>
                          <span className="font-mono">{ap.porcentajeIncorrectasCol}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400 rounded-full"
                            style={{ width: `${ap.porcentajeIncorrectasCol}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Bogotá ETC Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                          <span>Bogotá D.C. (ETC)</span>
                          <span className="font-mono">{ap.porcentajeIncorrectasETC}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-300 rounded-full"
                            style={{ width: `${ap.porcentajeIncorrectasETC}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Learning Actionable Classroom Recommendations */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              {(() => {
                const selectedAp = area.aprendizajesEvaluados[selectedLearningIndex];
                if (!selectedAp) return null;

                return (
                  <>
                    <div className="border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
                        <Lightbulb className="w-4 h-4" />
                        <span>Estrategia de Aula Recomendada</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {selectedAp.descripcion}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {selectedAp.recomendacionPedagogica}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                        Qué hacer en clase esta semana:
                      </span>
                      <ul className="space-y-2">
                        {selectedAp.estrategiaAula.map((estrategia, i) => (
                          <li
                            key={i}
                            className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{estrategia}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onNavigateToTab('mejoras')}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-blue-700 bg-blue-100/70 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <span>Abrir Simulador de Metas y Generador IA</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Official Qualitative Rubric of Performance Levels */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Rúbrica Cualitativa: ¿Qué sabe y qué sabe hacer el estudiante en cada nivel?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Definición oficial del ICFES para interpretar las capacidades reales del alumnado
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {area.nivelesDescripcion.map((nv, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${nv.colorClase}`}>
                    {nv.nivel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {nv.rango}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {nv.descripcion}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-700 block mb-0.5">Cómo potenciarlo:</strong>
                <p className="leading-snug">{nv.estrategiaParaSuperar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
