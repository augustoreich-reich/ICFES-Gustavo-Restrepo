import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Sliders,
  Scale,
} from 'lucide-react';
import { GLOSARIO_ICFES } from '../data/icfesData';

export const BeginnerGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredGlosario = GLOSARIO_ICFES.filter(
    (item) =>
      item.termino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definicionSimple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.metafora.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <BookOpen className="w-4 h-4" />
          <span>Manual Práctico para Docentes</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          Guía ICFES Saber 11° para Quien no es Estadístico
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Los reportes del ICFES suelen venir llenos de siglas, tablas de desviación y símbolos técnicos que complican su lectura.
          Esta guía explica en lenguaje cotidiano qué significan los números de nuestro colegio y cómo utilizarlos en las reuniones de área.
        </p>
      </div>

      {/* The 4 Big Concepts Explained with Everyday Metaphors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concept 1: Scale 0-100 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">1</span>
            <span>¿Por qué 50 puntos no es perder la materia?</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            La Escala Estandarizada de 0 a 100
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            En el colegio estamos acostumbrados a que una nota de 50 sobre 100 es reprobatoria o apenas raspando. <strong>En el ICFES no funciona así</strong>:
          </p>
          <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-lg text-xs text-blue-950 leading-relaxed">
            <strong>Metáfora:</strong> Imagina una balanza nacional calibrada en el centro. El puntaje <strong>50 es exactamente el promedio de toda Colombia</strong>. Si tus alumnos sacan 54 (como en Lectura Crítica o Inglés en nuestro colegio), significa que están por encima de la mitad del país.
          </div>
        </div>

        {/* Concept 2: Standard Deviation */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">2</span>
            <span>¿Qué es la Desviación Estándar y por qué te importa en el aula?</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            El "Termómetro de Desigualdad" del Salón
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            La desviación estándar te dice qué tan dispersos están los conocimientos entre tus estudiantes.
          </p>
          <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-lg text-xs text-emerald-950 leading-relaxed">
            <strong>Metáfora:</strong> Si en un aula de 30 estudiantes la mitad vuela sacando 80 y la otra mitad no entiende nada y saca 20, el promedio matemático dará 50, pero la desviación será altísima. <strong>Una desviación baja (como el 7 de Lectura en nuestro colegio)</strong> significa que todo el salón está aprendiendo de forma cohesionada y sin rezagos abismales.
          </div>
        </div>

        {/* Concept 3: Symbols (Triangles & Circles) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">3</span>
            <span>¿Qué significan los triángulos verdes, rojos y círculos?</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            El Semáforo de Significancia Estadística
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A veces el puntaje sube 1 punto de un año a otro por simple casualidad o cambio de preguntas. El ICFES calcula una fórmula matemática llamada "tamaño del efecto":
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">▲</span>
              <span><strong>Triángulo verde:</strong> La mejora es real y pedagógicamente comprobada (no es suerte).</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">▼</span>
              <span><strong>Triángulo rojo:</strong> Hubo una caída estadísticamente preocupante que exige plan de choque.</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-slate-500 text-white flex items-center justify-center text-[10px] font-bold">•</span>
              <span><strong>Círculo:</strong> Rendimiento similar al periodo anterior (dentro del margen de variación normal).</span>
            </div>
          </div>
        </div>

        {/* Concept 4: Performance Levels 1 to 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold">4</span>
            <span>Niveles de Desempeño: ¿Por qué la meta es Nivel 3 y 4?</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            De la Memorización a la Capacidad de Acción
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            El ICFES no evalúa solo datos memorizados, sino qué puede hacer el estudiante con ese conocimiento:
          </p>
          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-200">
              <span className="font-bold text-rose-700 font-mono">N1:</span>
              <span className="text-slate-600">Insuficiente: no domina los aprendizajes básicos esperados.</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-200">
              <span className="font-bold text-amber-700 font-mono">N2:</span>
              <span className="text-slate-600">Mínimo: resuelve preguntas mecánicas si le indican la fórmula.</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-emerald-50 rounded border border-emerald-200">
              <span className="font-bold text-emerald-700 font-mono">N3:</span>
              <span className="text-emerald-900">Satisfactorio: estándar de calidad. Argumenta y analiza con autonomía.</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-purple-50 rounded border border-purple-200">
              <span className="font-bold text-purple-700 font-mono">N4:</span>
              <span className="text-purple-900">Avanzado: propone soluciones no rutinarias y modela problemas complejos.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Glossary with Instant Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Glosario "ICFES sin Enredos"
            </h3>
            <p className="text-xs text-slate-500">
              Consulta rápida para reuniones de área, comités de evaluación y planeación curricular
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar término (ej. desviación, percentil)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredGlosario.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 transition-colors space-y-2.5"
            >
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>{item.termino}</span>
              </h4>

              <p className="text-xs text-slate-700 leading-relaxed">
                {item.definicionSimple}
              </p>

              <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong className="block text-[11px] text-blue-700 mb-0.5">En palabras sencillas:</strong>
                {item.metafora}
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-700">En nuestro colegio: </strong>
                {item.enElColegio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
