import React from 'react';
import { Printer } from 'lucide-react';

interface HeaderProps {
  currentTab: 'general' | 'mi_area' | 'mejoras' | 'guia' | 'ficha';
  onTabChange: (tab: 'general' | 'mi_area' | 'mejoras' | 'guia' | 'ficha') => void;
  onOpenPrintModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenPrintModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('general');
            }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-700 transition-colors"
          >
            SaberAnalítica Gustavo Restrepo
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('general')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'general'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Panorama General
            </button>
            <button
              onClick={() => onTabChange('mi_area')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'mi_area'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Mi Área Académica
            </button>
            <button
              onClick={() => onTabChange('mejoras')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'mejoras'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Plan de Mejoras
            </button>
            <button
              onClick={() => onTabChange('guia')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'guia'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Guía No Expertos
            </button>
            <button
              onClick={() => onTabChange('ficha')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'ficha'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Ficha Ejecutiva
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPrintModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title="Generar Ficha Oficial para reunión de área"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Ficha</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
