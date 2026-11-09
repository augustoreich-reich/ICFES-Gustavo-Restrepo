/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { AreaToolbar } from './components/AreaToolbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AreaDeepDive } from './components/AreaDeepDive';
import { ImprovementPlan } from './components/ImprovementPlan';
import { BeginnerGuide } from './components/BeginnerGuide';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { INSTITUTION_INFO } from './data/icfesData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'general' | 'mi_area' | 'mejoras' | 'guia' | 'ficha'>('general');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('global');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'reciente' | 'medio' | 'base'>('all');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const handleSelectArea = (areaId: string) => {
    setSelectedAreaId(areaId);
    if (areaId === 'global') {
      setCurrentTab('general');
    } else {
      setCurrentTab('mi_area');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar complying with the Top Bar Contract */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'general') {
            setSelectedAreaId('global');
          } else if (tab === 'mi_area' && selectedAreaId === 'global') {
            setSelectedAreaId('lectura_critica');
          }
        }}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Area & Role Selection Toolbar */}
      <AreaToolbar
        selectedAreaId={selectedAreaId}
        onSelectArea={handleSelectArea}
        periodFilter={periodFilter}
        onSelectPeriodFilter={setPeriodFilter}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'general' && (
          <OverviewDashboard
            periodFilter={periodFilter}
            onSelectArea={handleSelectArea}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              if (tab === 'mi_area' && selectedAreaId === 'global') {
                setSelectedAreaId('matematicas');
              }
            }}
          />
        )}

        {currentTab === 'mi_area' && (
          <AreaDeepDive
            areaId={selectedAreaId === 'global' ? 'lectura_critica' : selectedAreaId}
            onSelectArea={handleSelectArea}
            periodFilter={periodFilter}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'mejoras' && (
          <ImprovementPlan
            selectedAreaId={selectedAreaId}
            onSelectArea={handleSelectArea}
          />
        )}

        {currentTab === 'guia' && <BeginnerGuide />}

        {currentTab === 'ficha' && (
          <ExecutiveReportModal isInlineView={true} />
        )}
      </main>

      {/* Floating Printable Modal dialog when triggered from the Header button */}
      <ExecutiveReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        isInlineView={false}
      />

      {/* Quiet, Human-centered Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{INSTITUTION_INFO.nombre}</span>
            <span aria-hidden="true">·</span>
            <span>DANE {INSTITUTION_INFO.dane}</span>
            <span aria-hidden="true">·</span>
            <span>{INSTITUTION_INFO.sede}</span>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            <span>Reporte Histórico ICFES Saber 11° (2018–2026)</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-blue-700 font-medium">Uso pedagógico docente</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
