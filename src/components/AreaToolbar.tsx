import React from 'react';
import { BookOpen, Calculator, Users, Atom, Languages, School } from 'lucide-react';
import { AREAS_DATA, INSTITUTION_INFO } from '../data/icfesData';

interface AreaToolbarProps {
  selectedAreaId: string; // 'global' | 'lectura_critica' | etc.
  onSelectArea: (areaId: string) => void;
  periodFilter: 'all' | 'reciente' | 'medio' | 'base';
  onSelectPeriodFilter: (filter: 'all' | 'reciente' | 'medio' | 'base') => void;
}

export const AreaToolbar: React.FC<AreaToolbarProps> = ({
  selectedAreaId,
  onSelectArea,
  periodFilter,
  onSelectPeriodFilter,
}) => {
  const currentArea = AREAS_DATA[selectedAreaId];
  const lastScore = currentArea
    ? currentArea.historico[currentArea.historico.length - 1].promedio.ee
    : 259;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top school info & friendly greeting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{INSTITUTION_INFO.nombre}</span>
              <span aria-hidden="true">·</span>
              <span>DANE {INSTITUTION_INFO.dane}</span>
              <span aria-hidden="true">·</span>
              <span>{INSTITUTION_INFO.municipio}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-blue-700">Sector {INSTITUTION_INFO.sector} {INSTITUTION_INFO.zona}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Tablero Histórico Saber 11° para Docentes
            </h1>
          </div>

          {/* Period Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
            <span className="text-xs text-slate-500 px-2 font-medium hidden sm:inline">Periodo:</span>
            <button
              onClick={() => onSelectPeriodFilter('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                periodFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2018 - 2026 (9 Años)
            </button>
            <button
              onClick={() => onSelectPeriodFilter('reciente')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                periodFilter === 'reciente'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2024 - 2026
            </button>
            <button
              onClick={() => onSelectPeriodFilter('medio')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                periodFilter === 'medio'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2021 - 2023
            </button>
            <button
              onClick={() => onSelectPeriodFilter('base')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                periodFilter === 'base'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2018 - 2020
            </button>
          </div>
        </div>

        {/* Teacher Role / Area Selector Buttons */}
        <div className="pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selecciona tu Área Académica de Interés:
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {selectedAreaId === 'global'
                ? 'Vista integral de todas las áreas'
                : `Viendo métricas específicas de ${currentArea?.nombre} (Puntaje actual: ${lastScore} pts)`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {/* Global Option */}
            <button
              onClick={() => onSelectArea('global')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'global'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <School className={`w-4 h-4 shrink-0 ${selectedAreaId === 'global' ? 'text-white' : 'text-slate-500'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Todas las Áreas</div>
                <div className={`text-[10px] truncate ${selectedAreaId === 'global' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Directivos / General
                </div>
              </div>
            </button>

            {/* Lectura Crítica */}
            <button
              onClick={() => onSelectArea('lectura_critica')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'lectura_critica'
                  ? 'bg-blue-700 text-white border-blue-700 shadow-xs ring-2 ring-blue-700/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
              }`}
            >
              <BookOpen className={`w-4 h-4 shrink-0 ${selectedAreaId === 'lectura_critica' ? 'text-white' : 'text-blue-600'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Lectura Crítica</div>
                <div className={`text-[10px] font-mono tabular-nums truncate ${selectedAreaId === 'lectura_critica' ? 'text-blue-200' : 'text-slate-500'}`}>
                  Promedio: 54 pts
                </div>
              </div>
            </button>

            {/* Matemáticas */}
            <button
              onClick={() => onSelectArea('matematicas')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'matematicas'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-700/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <Calculator className={`w-4 h-4 shrink-0 ${selectedAreaId === 'matematicas' ? 'text-white' : 'text-emerald-600'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Matemáticas</div>
                <div className={`text-[10px] font-mono tabular-nums truncate ${selectedAreaId === 'matematicas' ? 'text-emerald-200' : 'text-slate-500'}`}>
                  Promedio: 49 pts
                </div>
              </div>
            </button>

            {/* Sociales y Ciudadanas */}
            <button
              onClick={() => onSelectArea('sociales_ciudadanas')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'sociales_ciudadanas'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-600/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
              }`}
            >
              <Users className={`w-4 h-4 shrink-0 ${selectedAreaId === 'sociales_ciudadanas' ? 'text-white' : 'text-amber-600'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Sociales y Ciu.</div>
                <div className={`text-[10px] font-mono tabular-nums truncate ${selectedAreaId === 'sociales_ciudadanas' ? 'text-amber-200' : 'text-slate-500'}`}>
                  Promedio: 52 pts
                </div>
              </div>
            </button>

            {/* Ciencias Naturales */}
            <button
              onClick={() => onSelectArea('ciencias_naturales')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'ciencias_naturales'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs ring-2 ring-cyan-700/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/40'
              }`}
            >
              <Atom className={`w-4 h-4 shrink-0 ${selectedAreaId === 'ciencias_naturales' ? 'text-white' : 'text-cyan-600'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Ciencias Nat.</div>
                <div className={`text-[10px] font-mono tabular-nums truncate ${selectedAreaId === 'ciencias_naturales' ? 'text-cyan-200' : 'text-slate-500'}`}>
                  Promedio: 52 pts
                </div>
              </div>
            </button>

            {/* Inglés */}
            <button
              onClick={() => onSelectArea('ingles')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                selectedAreaId === 'ingles'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs ring-2 ring-purple-700/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40'
              }`}
            >
              <Languages className={`w-4 h-4 shrink-0 ${selectedAreaId === 'ingles' ? 'text-white' : 'text-purple-600'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">Inglés</div>
                <div className={`text-[10px] font-mono tabular-nums truncate ${selectedAreaId === 'ingles' ? 'text-purple-200' : 'text-slate-500'}`}>
                  Promedio: 54 pts
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
