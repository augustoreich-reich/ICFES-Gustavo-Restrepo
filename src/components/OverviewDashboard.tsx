import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  HISTORICO_GLOBAL,
  AREAS_DATA,
  PERIODOS,
  INSTITUTION_INFO,
} from '../data/icfesData';

interface OverviewDashboardProps {
  periodFilter: 'all' | 'reciente' | 'medio' | 'base';
  onSelectArea: (areaId: string) => void;
  onNavigateToTab: (tab: 'general' | 'mi_area' | 'mejoras' | 'guia' | 'ficha') => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  periodFilter,
  onSelectArea,
  onNavigateToTab,
}) => {
  const [activeBenchmark, setActiveBenchmark] = useState<'colombia' | 'etc' | 'oficialesUrbanos' | 'privados'>('etc');

  // Filter periods according to selection
  const filteredRecords = HISTORICO_GLOBAL.filter((record) => {
    if (periodFilter === 'reciente') return ['2024-3', '2025-3', '2026-3'].includes(record.period);
    if (periodFilter === 'medio') return ['2021-4', '2022-4', '2023-4'].includes(record.period);
    if (periodFilter === 'base') return ['2018-2', '2019-4', '2020-4'].includes(record.period);
    return true;
  });

  const latestRecord = HISTORICO_GLOBAL[HISTORICO_GLOBAL.length - 1];
  const previousRecord = HISTORICO_GLOBAL[HISTORICO_GLOBAL.length - 2];
  const firstRecord = HISTORICO_GLOBAL[0];

  const diffPrevious = latestRecord.promedio.ee - previousRecord.promedio.ee;
  const diffCol = latestRecord.promedio.ee - latestRecord.promedio.colombia;
  const diffEtc = latestRecord.promedio.ee - latestRecord.promedio.etc;

  const benchmarkLabels = {
    etc: 'Bogotá (ETC)',
    colombia: 'Colombia (Nacional)',
    oficialesUrbanos: 'Oficiales Urbanos Bogotá',
    privados: 'Colegios Privados Bogotá',
  };

  return (
    <div className="space-y-8">
      {/* Friendly Intro Banner for Teachers */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Análisis de Datos y Diagnóstico Pedagógico Saber 11°</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-normal">9 cohortes analizadas (2018 al 2026)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Panorama Integral de Rendimiento: Colegio Gustavo Restrepo
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Bienvenido, profesor. Este panel traduce las cifras oficiales del ICFES en información pedagógica clara y accionable.
              Aquí podrás ver cómo avanza el colegio en su conjunto, comparar las cinco materias y acceder al diagnóstico específico de tu asignatura.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToTab('guia')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>¿Cómo leer estos datos?</span>
            </button>
            <button
              onClick={() => onNavigateToTab('mejoras')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Ver Plan de Mejoras</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Puntaje Global */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Puntaje Global Actual</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {latestRecord.promedio.ee}
            </span>
            <span className="text-xs text-slate-500">/ 500 puntos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Vs anterior ({previousRecord.period}):</span>
            <span
              className={`font-mono font-semibold inline-flex items-center gap-0.5 ${
                diffPrevious >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {diffPrevious >= 0 ? '+' : ''}{diffPrevious} pts
              {diffPrevious >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
            </span>
          </div>
        </div>

        {/* Card 2: Brecha con Colombia */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Comparación vs Colombia</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {diffCol >= 0 ? `+${diffCol}` : diffCol}
            </span>
            <span className="text-xs text-slate-500">puntos de ventaja</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Promedio nacional:</span>
            <span className="font-mono text-slate-700 font-semibold">
              {latestRecord.promedio.colombia} pts
            </span>
          </div>
        </div>

        {/* Card 3: Desviación Estándar (Brecha de Aprendizaje) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Desviación Estándar Global</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {latestRecord.desviacion.ee}
            </span>
            <span className="text-xs text-emerald-800 font-medium">Baja dispersión</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Dispersión Colombia:</span>
            <span className="font-mono text-slate-700 font-semibold">
              {latestRecord.desviacion.colombia} pts (Más desigual)
            </span>
          </div>
        </div>

        {/* Card 4: Cobertura de Estudiantes */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Estudiantes Evaluados</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {latestRecord.promedio.ee > 0 ? '77' : '--'}
            </span>
            <span className="text-xs text-slate-500">con resultados publicados</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Matriculados en SIMAT:</span>
            <span className="font-mono text-slate-700 font-semibold">
              81 alumnos (95% asistencia)
            </span>
          </div>
        </div>
      </div>

      {/* Main Longitudinal Comparison Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Evolución Histórica del Puntaje Global (0 a 500 Puntos)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trayectoria longitudinal del Colegio Gustavo Restrepo comparado con diferentes referentes territoriales
            </p>
          </div>

          {/* Benchmark switch button */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <span className="text-xs text-slate-500 px-2 font-medium">Comparar con:</span>
            {(['etc', 'colombia', 'oficialesUrbanos', 'privados'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveBenchmark(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeBenchmark === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {key === 'etc'
                  ? 'Bogotá ETC'
                  : key === 'colombia'
                  ? 'Colombia'
                  : key === 'oficialesUrbanos'
                  ? 'Ofic. Urbanos'
                  : 'Privados'}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="mt-6">
          <div className="h-72 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
              {/* Grid Lines (230, 250, 270, 290, 310) */}
              {[230, 250, 270, 290, 310].map((val) => {
                const y = 240 - ((val - 230) / (315 - 230)) * 220;
                return (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={y}
                      x2="780"
                      y2={y}
                      stroke="#f1f5f9"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x="32"
                      y={y + 4}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-mono tabular-nums"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Benchmark Reference Line */}
              {(() => {
                const points = filteredRecords.map((r, i) => {
                  const x = 50 + (i / (filteredRecords.length - 1 || 1)) * 710;
                  const score = r.promedio[activeBenchmark];
                  const y = 240 - ((score - 230) / (315 - 230)) * 220;
                  return `${x},${y}`;
                });
                return (
                  <polyline
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    points={points.join(' ')}
                  />
                );
              })()}

              {/* School (Colegio Gustavo Restrepo) Line */}
              {(() => {
                const points = filteredRecords.map((r, i) => {
                  const x = 50 + (i / (filteredRecords.length - 1 || 1)) * 710;
                  const score = r.promedio.ee;
                  const y = 240 - ((score - 230) / (315 - 230)) * 220;
                  return `${x},${y}`;
                });
                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3.5"
                      points={points.join(' ')}
                    />
                    {filteredRecords.map((r, i) => {
                      const x = 50 + (i / (filteredRecords.length - 1 || 1)) * 710;
                      const score = r.promedio.ee;
                      const y = 240 - ((score - 230) / (315 - 230)) * 220;
                      return (
                        <g key={r.period}>
                          <circle
                            cx={x}
                            cy={y}
                            r="5.5"
                            className="fill-white stroke-blue-700"
                            strokeWidth="3"
                          />
                          <rect
                            x={x - 16}
                            y={y - 24}
                            width="32"
                            height="18"
                            rx="4"
                            className="fill-slate-900"
                          />
                          <text
                            x={x}
                            y={y - 12}
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

              {/* X-Axis Labels */}
              {filteredRecords.map((r, i) => {
                const x = 50 + (i / (filteredRecords.length - 1 || 1)) * 710;
                return (
                  <text
                    key={r.period}
                    x={x}
                    y="238"
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-500 font-mono tabular-nums"
                  >
                    {r.period}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-blue-600 rounded-full inline-block"></span>
              <span className="font-semibold text-slate-800">Colegio Gustavo Restrepo (EE)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400 inline-block"></span>
              <span className="text-slate-600">Referente: {benchmarkLabels[activeBenchmark]}</span>
            </div>
            <div className="text-slate-400 hidden sm:inline">|</div>
            <div className="text-slate-500">
              Media histórica nacional: <strong className="font-mono text-slate-700">250 pts</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Academic Areas Comparison Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Rendimiento por Áreas del Conocimiento (Escala 0 a 100)
            </h3>
            <p className="text-xs text-slate-500">
              Haz clic en cualquier área para ingresar a su análisis curricular profundo y ver las preguntas de mayor dificultad
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.values(AREAS_DATA).map((area) => {
            const last = area.historico[area.historico.length - 1];
            const prev = area.historico[area.historico.length - 2];
            const diff = last.promedio.ee - prev.promedio.ee;
            const vsCol = last.promedio.ee - last.promedio.colombia;

            // Determine health status
            const isCritical = area.id === 'matematicas';
            const isFavorable = area.id === 'lectura_critica' || area.id === 'ingles';

            return (
              <div
                key={area.id}
                onClick={() => onSelectArea(area.id)}
                className={`group bg-white border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-blue-400 relative overflow-hidden ${
                  isCritical ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                }`}
              >
                {/* Area Header */}
                <div className="flex items-start justify-between">
                  <div className="truncate">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Área
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                      {area.nombre}
                    </h4>
                  </div>
                  <span
                    className="p-1.5 rounded-lg text-white shrink-0"
                    style={{ backgroundColor: area.color }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Score */}
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {last.promedio.ee}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">pts</span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
                      diff > 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : diff < 0
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {diff > 0 ? '+' : ''}{diff} pts
                    {diff > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : diff < 0 ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* Context Stats */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Vs Colombia:</span>
                    <span className={`font-mono font-medium ${vsCol >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {vsCol >= 0 ? `+${vsCol}` : vsCol} pts ({last.promedio.colombia})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Desviación:</span>
                    <span className="font-mono text-slate-700 font-semibold">
                      {last.desviacion.ee} pts
                    </span>
                  </div>
                </div>

                {/* Quick Alert Banner */}
                {isCritical && (
                  <div className="mt-3 py-1 px-2 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 shrink-0 text-amber-600" />
                    <span className="truncate">Requiere refuerzo urgente</span>
                  </div>
                )}
                {isFavorable && !isCritical && (
                  <div className="mt-3 py-1 px-2 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-600" />
                    <span className="truncate">Desempeño destacado</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Area Full Historical Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Matriz Comparativa de Puntajes por Cohorte y Materia
            </h3>
            <p className="text-xs text-slate-500">
              Puntajes promedio de 0 a 100 de los estudiantes del Gustavo Restrepo a través del tiempo
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Media Nacional = 50 pts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Periodo de Aplicación</th>
                <th className="py-3 px-3 text-center">Global (500)</th>
                <th className="py-3 px-3 text-center text-blue-700">Lectura Crítica</th>
                <th className="py-3 px-3 text-center text-emerald-700">Matemáticas</th>
                <th className="py-3 px-3 text-center text-amber-700">Sociales y Ciu.</th>
                <th className="py-3 px-3 text-center text-cyan-700">Ciencias Nat.</th>
                <th className="py-3 px-3 text-center text-purple-700">Inglés</th>
                <th className="py-3 px-4 text-center">Evaluados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {filteredRecords.map((r, idx) => {
                const lc = AREAS_DATA.lectura_critica.historico.find((h) => h.period === r.period);
                const mat = AREAS_DATA.matematicas.historico.find((h) => h.period === r.period);
                const soc = AREAS_DATA.sociales_ciudadanas.historico.find((h) => h.period === r.period);
                const cn = AREAS_DATA.ciencias_naturales.historico.find((h) => h.period === r.period);
                const ing = AREAS_DATA.ingles.historico.find((h) => h.period === r.period);
                const periodInfo = PERIODOS.find((p) => p.period === r.period);

                return (
                  <tr
                    key={r.period}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      idx === filteredRecords.length - 1 ? 'bg-blue-50/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-medium text-slate-900 flex items-center gap-2">
                      <span>{r.period}</span>
                      {idx === filteredRecords.length - 1 && (
                        <span className="text-[10px] font-sans px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-bold">
                          Reciente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">
                      {r.promedio.ee}
                    </td>
                    <td className="py-3 px-3 text-center text-blue-800 font-semibold">
                      {lc?.promedio.ee || '--'}
                    </td>
                    <td
                      className={`py-3 px-3 text-center font-semibold ${
                        (mat?.promedio.ee || 0) < 50 ? 'text-amber-700 font-bold' : 'text-emerald-800'
                      }`}
                    >
                      {mat?.promedio.ee || '--'}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-800">
                      {soc?.promedio.ee || '--'}
                    </td>
                    <td className="py-3 px-3 text-center text-cyan-800">
                      {cn?.promedio.ee || '--'}
                    </td>
                    <td className="py-3 px-3 text-center text-purple-800 font-semibold">
                      {ing?.promedio.ee || '--'}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 font-sans">
                      {periodInfo?.publicados || 77}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pedagogical Takeaways for the School Leadership & Faculty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Mayor Fortaleza Institucional</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900">
            Lectura Crítica es el motor académico del colegio
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Con un puntaje sostenido de 54 a 56 y el 72% de estudiantes consolidados en Nivel 3 (Satisfactorio), la comprensión textual es el mayor activo del Gustavo Restrepo. Además, la bajísima dispersión (desviación de 7) muestra que el salón avanza parejo.
          </p>
          <button
            onClick={() => onSelectArea('lectura_critica')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 pt-1"
          >
            <span>Ver detalle de Lectura Crítica</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Prioridad de Intervención Docente</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900">
            Alerta en Formulación Matemática y Ciencias
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Matemáticas cayó a 49 puntos en la última aplicación y el 68% de las respuestas son erróneas al pedirle al alumno que plantee un procedimiento por su cuenta. En Ciencias Naturales, el 64% falla en modelar variables experimentales.
          </p>
          <button
            onClick={() => onSelectArea('matematicas')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 pt-1"
          >
            <span>Ver diagnóstico de Matemáticas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Progreso Histórico en Inglés</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900">
            Rescate del rezago lingüístico extremo
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            En 2020, el 61% de los estudiantes se encontraba en nivel A- (por debajo de principiante). En la cohorte reciente se redujo al 28%, permitiendo que el puntaje medio subiera a 54 puntos, superando el promedio nacional.
          </p>
          <button
            onClick={() => onSelectArea('ingles')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 pt-1"
          >
            <span>Ver evolución en Inglés</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
