import React, { useState } from 'react';
import {
  Printer,
  Download,
  Copy,
  Check,
  X,
  FileText,
  School,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  INSTITUTION_INFO,
  HISTORICO_GLOBAL,
  AREAS_DATA,
  PERIODOS,
} from '../data/icfesData';

interface ExecutiveReportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInlineView?: boolean;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen = true,
  onClose,
  isInlineView = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen && !isInlineView) return null;

  const latestRecord = HISTORICO_GLOBAL[HISTORICO_GLOBAL.length - 1];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    // Generate full CSV
    const headers = [
      'Periodo',
      'Matriculados',
      'Presentes',
      'Puntaje_Global_EE',
      'Global_Colombia',
      'Global_Bogota_ETC',
      'Lectura_Critica',
      'Matematicas',
      'Sociales_Ciudadanas',
      'Ciencias_Naturales',
      'Ingles',
    ];

    const rows = HISTORICO_GLOBAL.map((h) => {
      const pInfo = PERIODOS.find((p) => p.period === h.period);
      const lc = AREAS_DATA.lectura_critica.historico.find((x) => x.period === h.period)?.promedio.ee || '';
      const mat = AREAS_DATA.matematicas.historico.find((x) => x.period === h.period)?.promedio.ee || '';
      const soc = AREAS_DATA.sociales_ciudadanas.historico.find((x) => x.period === h.period)?.promedio.ee || '';
      const cn = AREAS_DATA.ciencias_naturales.historico.find((x) => x.period === h.period)?.promedio.ee || '';
      const ing = AREAS_DATA.ingles.historico.find((x) => x.period === h.period)?.promedio.ee || '';

      return [
        h.period,
        pInfo?.matriculados || '',
        pInfo?.presentes || '',
        h.promedio.ee,
        h.promedio.colombia,
        h.promedio.etc,
        lc,
        mat,
        soc,
        cn,
        ing,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Saber11_GustavoRestrepo_Historico.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMinutes = () => {
    const text = `ACTA DE REUNIÓN PEDAGÓGICA - ANÁLISIS HISTÓRICO SABER 11°
Institución: ${INSTITUTION_INFO.nombre}
DANE: ${INSTITUTION_INFO.dane} | Sede: ${INSTITUTION_INFO.sede}
Puntaje Global Reciente: ${latestRecord.promedio.ee} puntos (Colombia: ${latestRecord.promedio.colombia}, Bogotá: ${latestRecord.promedio.etc})
Desviación Estándar Global: ${latestRecord.desviacion.ee} puntos

RESUMEN POR ÁREAS:
- Lectura Crítica: 54 pts | 72% en Nivel 3 (Satisfactorio) | Mayor fortaleza.
- Matemáticas: 49 pts | 68% error en Formulación de Problemas | Requiere refuerzo prioritario.
- Sociales y Ciudadanas: 52 pts | Reducción de Nivel 1 al 9% | Fortalecer pensamiento sistémico.
- Ciencias Naturales: 52 pts | 64% error en modelación de variables experimentales.
- Inglés: 54 pts | Rescate histórico: Nivel A- cayó del 61% al 28%.

COMPROMISOS PEDAGÓGICOS:
1. Implementar método de resolución de problemas en 4 etapas en Matemáticas y Ciencias.
2. Continuar potenciando el Nivel 3 y 4 en Lectura Crítica mediante debates argumentativos.
3. Incorporar preguntas tipo ICFES con análisis de distractores en las evaluaciones periódicas.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs print:border-none print:shadow-none">
      {/* Top action toolbar (hidden on print) */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-700" />
          <span className="text-xs font-bold text-slate-800">
            Ficha Oficial de Análisis Pedagógico para Reunión de Área y Consejo Académico
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMinutes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado al portapapeles' : 'Copiar Texto para Acta'}</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Guardar PDF</span>
          </button>
          {!isInlineView && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="p-8 max-w-4xl mx-auto space-y-6 print:p-0 print:space-y-4">
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-800 block">
                REPORTE DE RESULTADOS HISTÓRICOS SABER 11°
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {INSTITUTION_INFO.nombre}
              </h1>
              <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span><strong>DANE:</strong> {INSTITUTION_INFO.dane}</span>
                <span><strong>Sede:</strong> {INSTITUTION_INFO.sede}</span>
                <span><strong>Ubicación:</strong> {INSTITUTION_INFO.municipio}</span>
                <span><strong>Sector:</strong> {INSTITUTION_INFO.sector} {INSTITUTION_INFO.zona}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold font-mono rounded">
                PUNTAJE: {latestRecord.promedio.ee} / 500
              </span>
              <div className="text-[10px] text-slate-500 font-mono mt-1">
                Cohorte: {latestRecord.period}
              </div>
            </div>
          </div>
        </div>

        {/* Global Summary Box */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono text-xs">
          <div>
            <div className="text-[10px] text-slate-500 font-sans">Puntaje Global EE</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{latestRecord.promedio.ee}</div>
            <div className="text-[10px] text-emerald-700 font-sans">+1 vs Colombia</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-sans">Bogotá D.C. (ETC)</div>
            <div className="text-xl font-black text-slate-700 mt-0.5">{latestRecord.promedio.etc}</div>
            <div className="text-[10px] text-slate-500 font-sans">Brecha: -14 pts</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-sans">Colombia Nacional</div>
            <div className="text-xl font-black text-slate-700 mt-0.5">{latestRecord.promedio.colombia}</div>
            <div className="text-[10px] text-slate-500 font-sans">Media base: 250</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-sans">Desviación Global</div>
            <div className="text-xl font-black text-emerald-700 mt-0.5">{latestRecord.desviacion.ee}</div>
            <div className="text-[10px] text-emerald-800 font-sans">Alta cohesión</div>
          </div>
        </div>

        {/* Table of 5 Areas */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. Desempeño por Áreas Académicas (Escala 0 a 100)
          </h3>
          <table className="w-full text-xs border border-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <th className="p-2 text-left">Área Evaluada</th>
                <th className="p-2 text-center">Puntaje EE</th>
                <th className="p-2 text-center">Desviación</th>
                <th className="p-2 text-center">Colombia</th>
                <th className="p-2 text-center">Bogotá ETC</th>
                <th className="p-2 text-left">Diagnóstico Pedagógico y Reto Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.values(AREAS_DATA).map((area) => {
                const rec = area.historico[area.historico.length - 1];
                return (
                  <tr key={area.id} className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">{area.nombre}</td>
                    <td className="p-2 text-center font-mono font-bold text-slate-900">{rec.promedio.ee}</td>
                    <td className="p-2 text-center font-mono text-slate-600">{rec.desviacion.ee}</td>
                    <td className="p-2 text-center font-mono text-slate-600">{rec.promedio.colombia}</td>
                    <td className="p-2 text-center font-mono text-slate-600">{rec.promedio.etc}</td>
                    <td className="p-2 text-slate-700 text-[11px]">
                      {area.id === 'matematicas' && 'Alerta: 68% de error en formulación y ejecución de soluciones a problemas.'}
                      {area.id === 'lectura_critica' && 'Fortaleza: 72% en Nivel 3. Foco en escalar a Nivel 4 en reflexión y sesgos.'}
                      {area.id === 'sociales_ciudadanas' && 'Avance en Nivel 1 (bajó al 9%). Reto en pensamiento sistémico (economía vs derechos).'}
                      {area.id === 'ciencias_naturales' && 'Estable (52 pts). Urgente reforzar modelación de variables físicas y químicas.'}
                      {area.id === 'ingles' && 'Progreso histórico: Nivel A- cayó del 61% al 28%. Puntaje superó la media de Colombia.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Commitments */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. Compromisos Pedagógicos Inmediatos para el Aula
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-1">
              <strong className="text-slate-900 block">Resolución de Problemas (Matemáticas y Ciencias):</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Dedicar 15 minutos semanales a problemas contextualizados no rutinarios donde los alumnos deban explicar el porqué de cada paso y detectar errores prediseñados.
              </p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-1">
              <strong className="text-slate-900 block">Lectura Crítica Interdisciplinar:</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Todas las áreas incorporarán la lectura de textos discontinuos (tablas estadísticas, infografías y caricaturas) evaluando la intención del autor.
              </p>
            </div>
          </div>
        </div>

        {/* Signature Line for Area Committee */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs text-slate-500">
          <div>
            <div className="border-b border-slate-400 w-3/4 mx-auto mb-1"></div>
            <span>Rectoría / Coordinación Académica</span>
          </div>
          <div>
            <div className="border-b border-slate-400 w-3/4 mx-auto mb-1"></div>
            <span>Jefe de Área / Docente Líder</span>
          </div>
          <div>
            <div className="border-b border-slate-400 w-3/4 mx-auto mb-1"></div>
            <span>Fecha y Firma Comité</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isInlineView) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full my-8 bg-white rounded-xl shadow-2xl">
        {content}
      </div>
    </div>
  );
};
