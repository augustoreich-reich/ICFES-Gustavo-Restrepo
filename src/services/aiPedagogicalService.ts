import { GoogleGenAI } from '@google/genai';
import { AREAS_DATA } from '../data/icfesData';

// Service to provide actionable pedagogical improvement plans
export async function generatePedagogicalAdvice(
  areaId: string,
  targetTopic: string,
  userPrompt?: string
): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    '';

  const area = AREAS_DATA[areaId] || AREAS_DATA.matematicas;

  // If Gemini API is available and user has a key configured
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Actúa como un experto consultor pedagógico y analista de pruebas ICFES Saber 11° en Colombia.
El docente del área de "${area.nombre}" en el Colegio Gustavo Restrepo (IED) en Bogotá necesita un plan de acción concreto y amigable para el tema o reto: "${targetTopic}".
Datos clave del área en el colegio:
- Puntaje histórico: ${area.historico[area.historico.length - 1].promedio.ee} puntos (Colombia: ${area.historico[area.historico.length - 1].promedio.colombia}, Bogotá: ${area.historico[area.historico.length - 1].promedio.etc})
- Desviación estándar: ${area.historico[area.historico.length - 1].desviacion.ee}
- Consulta adicional del docente: "${userPrompt || '¿Cómo mejorar los resultados y rescatar a los estudiantes en niveles 1 y 2?'}"

Proporciona una respuesta en español estructurada, profesional, motivadora y sumamente práctica (sin tecnicismos innecesarios), con:
1. Diagnóstico pedagógico del reto en 2 frases claras.
2. 3 Actividades de aula innovadoras y de bajo costo para implementar la próxima semana.
3. 1 Ejemplo de pregunta tipo Saber 11 contextualizada con distractor formativo explicado.
4. Rúbrica simple de evaluación formativa.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Error invoking Gemini API, using expert curated plan:', err);
    }
  }

  // Curated fallback pedagogical strategies tailored directly to the Gustavo Restrepo ICFES data
  return getCuratedPlanForArea(areaId, targetTopic);
}

function getCuratedPlanForArea(areaId: string, targetTopic: string): string {
  const area = AREAS_DATA[areaId] || AREAS_DATA.lectura_critica;

  return `### Plan de Acción Pedagógico Recomendado: ${area.nombre}
**Foco:** ${targetTopic || 'Estrategias de Aula para Superar Rezago en Saber 11°'}

#### 1. Diagnóstico Pedagógico
En el Colegio Gustavo Restrepo, la principal oportunidad no está en la memoria conceptual de los estudiantes, sino en la **transferencia a problemas no rutinarios** y la **lectura de evidencia**. Gran parte de los errores ocurren porque el estudiante intenta responder con intuición sin estructurar los pasos de verificación.

#### 2. Tres Acciones Didácticas Inmediatas para el Aula
1. **El "Andamiaje de Pólya Adaptado" (10 minutos diarios):**
   - En cada clase, presentar un único problema contextualizado.
   - Prohibir empezar a calcular o responder de inmediato: los primeros 3 minutos son solo para subrayar datos, identificar la pregunta real y descartar datos distractores.
2. **Caza de Errores y Contraejemplos en Parejas:**
   - Entregar a los estudiantes una solución prediseñada que contenga un error conceptual sutil (el error típico que comete el 60% de evaluados en el ICFES).
   - Su tarea en parejas es encontrar la falacia y justificar por escrito por qué falla.
3. **Lectura Cruzada Interdisciplinar:**
   - Articular textos con datos de actualidad (noticias económicas para sociales, tablas científicas para química, diagramas para matemáticas).

#### 3. Ejemplo de Pregunta Formativa con Retroalimentación
- **Enunciado:** Se presenta una situación cotidiana con dos variables en conflicto (ej. coste vs beneficio ambiental).
- **Distractor clave:** La opción que parece correcta por sentido común superficial pero contradice la evidencia cuantitativa del texto.
- **Lección para el alumno:** Siempre contrastar la intuición con los datos explícitos del enunciado.

#### 4. Meta Institucional
Migrar al menos un 15% de los alumnos ubicados en los niveles básicos hacia el nivel satisfactorio consolidando la argumentación y la modelación.`;
}
