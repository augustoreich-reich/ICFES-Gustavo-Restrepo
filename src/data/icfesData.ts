/**
 * Datos oficiales extraídos de los reportes históricos ICFES Saber 11°
 * Establecimiento: COLEGIO GUSTAVO RESTREPO (IED)
 * Código DANE: 111001027332
 * Sede: Sede 1 - COL DIST GUSTAVO RESTREPO
 * Ubicación: Bogotá D.C., Sector Oficial Urbano, GC 3
 * Fuentes: Reportes ICFES periodos 2018-2 a 2026-3
 */

export interface PeriodData {
  period: string;
  year: string;
  examDate: string;
  reportDate: string;
  matriculados: number;
  inscritos: number;
  presentes: number;
  publicados: number;
}

export interface ScoreComparison {
  ee: number; // Establecimiento Educativo
  sede1: number;
  colombia: number;
  etc: number; // Bogotá ETC
  oficialesUrbanos: number;
  oficialesRurales: number;
  privados: number;
}

export interface AreaHistoryRecord {
  period: string;
  promedio: ScoreComparison;
  desviacion: ScoreComparison;
  niveles: {
    [key: string]: number;
  };
  tendenciaPromedio?: 'subio' | 'bajo' | 'igual';
  tendenciaDesviacion?: 'subio' | 'bajo' | 'igual';
}

export interface AprendizajeCritico {
  id: string;
  descripcion: string;
  competencia: string;
  proceso?: string;
  porcentajeIncorrectasEE: number;
  porcentajeIncorrectasCol: number;
  porcentajeIncorrectasETC: number;
  nivelRiesgo: 'critico' | 'medio' | 'favorable';
  recomendacionPedagogica: string;
  estrategiaAula: string[];
}

export interface AreaData {
  id: 'global' | 'lectura_critica' | 'matematicas' | 'sociales_ciudadanas' | 'ciencias_naturales' | 'ingles';
  nombre: string;
  nombreCorto: string;
  icono: string;
  color: string;
  escala: '0-500' | '0-100';
  descripcionAmigable: string;
  propositoFormativo: string;
  queEvalua: string[];
  historico: AreaHistoryRecord[];
  aprendizajesEvaluados?: AprendizajeCritico[];
  nivelesDescripcion: {
    nivel: string;
    rango: string;
    descripcion: string;
    estrategiaParaSuperar: string;
    colorClase: string;
  }[];
  diagnosticoGeneral: {
    puntosFuertes: string[];
    retosUrgentes: string[];
    patronesDetectados: string[];
    metaTrienio: string;
  };
}

export const INSTITUTION_INFO = {
  nombre: 'COLEGIO GUSTAVO RESTREPO (IED)',
  dane: '111001027332',
  direccion: 'CL 28 SUR 14 51',
  municipio: 'BOGOTÁ D.C. - BOGOTÁ',
  etc: 'BOGOTÁ',
  sector: 'Oficial',
  zona: 'Urbano',
  grupoComparacion: '3',
  sede: 'Sede 1 - COL DIST GUSTAVO RESTREPO',
};

export const PERIODOS: PeriodData[] = [
  { period: '2018-2', year: '2018', examDate: '12/08/18', reportDate: '07/12/18', matriculados: 78, inscritos: 78, presentes: 77, publicados: 75 },
  { period: '2019-4', year: '2019', examDate: '11/08/19', reportDate: '23/11/19', matriculados: 67, inscritos: 66, presentes: 66, publicados: 64 },
  { period: '2020-4', year: '2020', examDate: '07/11/20', reportDate: '16/02/21', matriculados: 87, inscritos: 87, presentes: 84, publicados: 84 },
  { period: '2021-4', year: '2021', examDate: '04/09/21', reportDate: '12/02/22', matriculados: 94, inscritos: 90, presentes: 83, publicados: 83 },
  { period: '2022-4', year: '2022', examDate: '04/09/22', reportDate: '28/02/23', matriculados: 87, inscritos: 83, presentes: 83, publicados: 83 },
  { period: '2023-4', year: '2023', examDate: '13/08/23', reportDate: '10/02/24', matriculados: 91, inscritos: 90, presentes: 88, publicados: 88 },
  { period: '2024-3', year: '2024', examDate: '18/08/24', reportDate: '28/02/25', matriculados: 98, inscritos: 96, presentes: 94, publicados: 94 },
  { period: '2025-3', year: '2025', examDate: '10/08/25', reportDate: '30/12/25', matriculados: 97, inscritos: 96, presentes: 94, publicados: 94 },
  { period: '2026-3', year: '2026', examDate: '26/07/26', reportDate: '23/10/26', matriculados: 81, inscritos: 79, presentes: 77, publicados: 77 },
];

export const HISTORICO_GLOBAL: AreaHistoryRecord[] = [
  {
    period: '2018-2',
    promedio: { ee: 264, sede1: 264, colombia: 258, etc: 276, oficialesUrbanos: 262, oficialesRurales: 247, privados: 296 },
    desviacion: { ee: 36, sede1: 36, colombia: 49, etc: 46, oficialesUrbanos: 41, oficialesRurales: 37, privados: 45 },
    niveles: {},
    tendenciaPromedio: 'igual',
    tendenciaDesviacion: 'igual',
  },
  {
    period: '2019-4',
    promedio: { ee: 256, sede1: 256, colombia: 253, etc: 272, oficialesUrbanos: 258, oficialesRurales: 246, privados: 292 },
    desviacion: { ee: 36, sede1: 36, colombia: 50, etc: 47, oficialesUrbanos: 42, oficialesRurales: 40, privados: 46 },
    niveles: {},
    tendenciaPromedio: 'bajo',
    tendenciaDesviacion: 'igual',
  },
  {
    period: '2020-4',
    promedio: { ee: 264, sede1: 264, colombia: 252, etc: 270, oficialesUrbanos: 257, oficialesRurales: 242, privados: 290 },
    desviacion: { ee: 36, sede1: 36, colombia: 48, etc: 45, oficialesUrbanos: 40, oficialesRurales: 37, privados: 44 },
    niveles: {},
    tendenciaPromedio: 'subio',
    tendenciaDesviacion: 'igual',
  },
  {
    period: '2021-4',
    promedio: { ee: 260, sede1: 260, colombia: 250, etc: 270, oficialesUrbanos: 255, oficialesRurales: 239, privados: 293 },
    desviacion: { ee: 43, sede1: 43, colombia: 50, etc: 48, oficialesUrbanos: 42, oficialesRurales: 38, privados: 47 },
    niveles: {},
    tendenciaPromedio: 'bajo',
    tendenciaDesviacion: 'subio',
  },
  {
    period: '2022-4',
    promedio: { ee: 265, sede1: 265, colombia: 254, etc: 274, oficialesUrbanos: 259, oficialesRurales: 248, privados: 295 },
    desviacion: { ee: 38, sede1: 38, colombia: 51, etc: 48, oficialesUrbanos: 43, oficialesRurales: 42, privados: 47 },
    niveles: {},
    tendenciaPromedio: 'subio',
    tendenciaDesviacion: 'bajo',
  },
  {
    period: '2023-4',
    promedio: { ee: 262, sede1: 262, colombia: 257, etc: 274, oficialesUrbanos: 260, oficialesRurales: 243, privados: 295 },
    desviacion: { ee: 44, sede1: 44, colombia: 51, etc: 48, oficialesUrbanos: 43, oficialesRurales: 38, privados: 47 },
    niveles: {},
    tendenciaPromedio: 'igual',
    tendenciaDesviacion: 'subio',
  },
  {
    period: '2024-3',
    promedio: { ee: 255, sede1: 255, colombia: 260, etc: 277, oficialesUrbanos: 264, oficialesRurales: 251, privados: 299 },
    desviacion: { ee: 43, sede1: 43, colombia: 52, etc: 47, oficialesUrbanos: 43, oficialesRurales: 44, privados: 46 },
    niveles: {},
    tendenciaPromedio: 'bajo',
    tendenciaDesviacion: 'igual',
  },
  {
    period: '2025-3',
    promedio: { ee: 256, sede1: 256, colombia: 261, etc: 278, oficialesUrbanos: 263, oficialesRurales: 249, privados: 301 },
    desviacion: { ee: 36, sede1: 36, colombia: 53, etc: 49, oficialesUrbanos: 44, oficialesRurales: 43, privados: 47 },
    niveles: {},
    tendenciaPromedio: 'igual',
    tendenciaDesviacion: 'bajo',
  },
  {
    period: '2026-3',
    promedio: { ee: 259, sede1: 259, colombia: 258, etc: 273, oficialesUrbanos: 260, oficialesRurales: 251, privados: 293 },
    desviacion: { ee: 36, sede1: 36, colombia: 48, etc: 44, oficialesUrbanos: 40, oficialesRurales: 37, privados: 44 },
    niveles: {},
    tendenciaPromedio: 'subio',
    tendenciaDesviacion: 'igual',
  },
];

export const AREAS_DATA: Record<string, AreaData> = {
  lectura_critica: {
    id: 'lectura_critica',
    nombre: 'Lectura Crítica',
    nombreCorto: 'Lectura',
    icono: 'BookOpen',
    color: '#2563EB',
    escala: '0-100',
    descripcionAmigable:
      'Evalúa la capacidad de comprender, interpretar y valorar críticamente textos continuos (ensayos, columnas) y discontinuos (infografías, caricaturas). Es la habilidad transversal para aprender en todas las demás áreas.',
    propositoFormativo:
      'Formar ciudadanos capaces de discernir intenciones, contrastar posturas y argumentar con criterio reflexivo.',
    queEvalua: [
      'Identificar y entender contenidos locales (palabras, frases, ideas directas)',
      'Comprender la articulación global de las partes de un texto (estructura y coherencia)',
      'Reflexionar a partir de un texto y evaluar su contenido (intención del autor, validez de argumentos)',
    ],
    historico: [
      {
        period: '2018-2',
        promedio: { ee: 55, sede1: 55, colombia: 54, etc: 57, oficialesUrbanos: 55, oficialesRurales: 51, privados: 60 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 9, oficialesUrbanos: 9, oficialesRurales: 8, privados: 9 },
        niveles: { '1': 1, '2': 35, '3': 56, '4': 8 },
      },
      {
        period: '2019-4',
        promedio: { ee: 54, sede1: 54, colombia: 53, etc: 57, oficialesUrbanos: 54, oficialesRurales: 52, privados: 60 },
        desviacion: { ee: 8, sede1: 8, colombia: 10, etc: 9, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 0, '2': 27, '3': 66, '4': 8 },
      },
      {
        period: '2020-4',
        promedio: { ee: 56, sede1: 56, colombia: 53, etc: 56, oficialesUrbanos: 54, oficialesRurales: 51, privados: 59 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 9, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 1, '2': 23, '3': 65, '4': 11 },
      },
      {
        period: '2021-4',
        promedio: { ee: 56, sede1: 56, colombia: 53, etc: 57, oficialesUrbanos: 54, oficialesRurales: 51, privados: 61 },
        desviacion: { ee: 9, sede1: 9, colombia: 11, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 0, '2': 32, '3': 51, '4': 17 },
      },
      {
        period: '2022-4',
        promedio: { ee: 56, sede1: 56, colombia: 54, etc: 57, oficialesUrbanos: 55, oficialesRurales: 52, privados: 61 },
        desviacion: { ee: 8, sede1: 8, colombia: 11, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 1, '2': 25, '3': 61, '4': 13 },
      },
      {
        period: '2023-4',
        promedio: { ee: 55, sede1: 55, colombia: 54, etc: 57, oficialesUrbanos: 55, oficialesRurales: 51, privados: 61 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 1, '2': 30, '3': 57, '4': 12 },
      },
      {
        period: '2024-3',
        promedio: { ee: 53, sede1: 53, colombia: 54, etc: 58, oficialesUrbanos: 55, oficialesRurales: 53, privados: 61 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 9, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 3, '2': 33, '3': 59, '4': 5 },
      },
      {
        period: '2025-3',
        promedio: { ee: 53, sede1: 53, colombia: 55, etc: 58, oficialesUrbanos: 55, oficialesRurales: 53, privados: 62 },
        desviacion: { ee: 7, sede1: 7, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 9 },
        niveles: { '1': 0, '2': 41, '3': 57, '4': 2 },
      },
      {
        period: '2026-3',
        promedio: { ee: 54, sede1: 54, colombia: 53, etc: 56, oficialesUrbanos: 54, oficialesRurales: 52, privados: 60 },
        desviacion: { ee: 7, sede1: 7, colombia: 10, etc: 9, oficialesUrbanos: 8, oficialesRurales: 8, privados: 8 },
        niveles: { '1': 1, '2': 24, '3': 72, '4': 3 },
      },
    ],
    aprendizajesEvaluados: [
      {
        id: 'lc-ap1',
        descripcion: 'Reflexiona a partir de un texto y evalúa su contenido (postura crítica)',
        competencia: 'Reflexión y Evaluación',
        porcentajeIncorrectasEE: 47,
        porcentajeIncorrectasCol: 49,
        porcentajeIncorrectasETC: 44,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: 'Es donde más tropiezan los estudiantes: les cuesta identificar la intención implícita del autor o sesgos argumentativos.',
        estrategiaAula: [
          'Analizar editoriales de opinión contrastando posturas opuestas sobre el mismo hecho.',
          'Rutinas de pensamiento: "¿Qué intenta convencerme el autor?", "¿Qué pruebas aporta y cuáles omite?".',
          'Lectura guiada de textos discontinuos (caricaturas e infografías estadísticas).',
        ],
      },
      {
        id: 'lc-ap2',
        descripcion: 'Comprende cómo se articulan las partes de un texto para darle un sentido global',
        competencia: 'Comprensión Global',
        porcentajeIncorrectasEE: 47,
        porcentajeIncorrectasCol: 47,
        porcentajeIncorrectasETC: 42,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '47% de respuestas erróneas: dificultad para conectar premisas secundarias con la tesis central.',
        estrategiaAula: [
          'Mapas conceptuales de párrafos (tesis -> argumentos -> contraargumentos -> conclusión).',
          'Ejercicios de conectores lógicos (adversativos, causales, condicionales) y su efecto de significado.',
        ],
      },
      {
        id: 'lc-ap3',
        descripcion: 'Identifica y entiende los contenidos locales que conforman un texto',
        competencia: 'Identificación Local',
        porcentajeIncorrectasEE: 28,
        porcentajeIncorrectasCol: 29,
        porcentajeIncorrectasETC: 25,
        nivelRiesgo: 'favorable',
        recomendacionPedagogica: 'Fortaleza del colegio (solo 28% de fallas): los alumnos ubican con solvencia datos y vocabulario explícito.',
        estrategiaAula: [
          'Usar la comprensión literal como base para avanzar hacia inferencias complejas.',
        ],
      },
    ],
    nivelesDescripcion: [
      {
        nivel: 'Nivel 1 (0-35)',
        rango: '0 a 35 pts',
        descripcion: 'No alcanza a ubicar información explícita básica ni distingue el tema central de un texto sencillo.',
        estrategiaParaSuperar: 'Atención personalizada: fluidez lectora, vocabulario contextual y comprensión literal.',
        colorClase: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        nivel: 'Nivel 2 (36-50)',
        rango: '36 a 50 pts',
        descripcion: 'Ubica datos explícitos pero tiene dificultad para hilar párrafos o descubrir intenciones secundarias.',
        estrategiaParaSuperar: 'Organizadores gráficos e inferencias simples de causa-efecto.',
        colorClase: 'text-amber-800 bg-amber-50 border-amber-200',
      },
      {
        nivel: 'Nivel 3 (51-65)',
        rango: '51 a 65 pts',
        descripcion: 'Jerarquiza ideas, comprende la estructura global y evalúa argumentos con criterio sólido (Satisfactorio).',
        estrategiaParaSuperar: 'Consolidar este nivel mayoritario (72% en 2026) con ensayos breves y debates guiados.',
        colorClase: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      },
      {
        nivel: 'Nivel 4 (66-100)',
        rango: '66 a 100 pts',
        descripcion: 'Lectura crítica avanzada: detecta sutilezas, ironías, falacias e intertextualidad entre autores.',
        estrategiaParaSuperar: 'Clubes de lectura filosófica y análisis de papers científicos o ensayos clásicos.',
        colorClase: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      },
    ],
    diagnosticoGeneral: {
      puntosFuertes: [
        'Excelente consolidación en Nivel 3 (satisfactorio), alcanzando el 72% de los estudiantes en la última cohorte.',
        'Mínimo porcentaje en Nivel 1 (apenas 1%), lo que demuestra que prácticamente no hay rezago crítico absoluto.',
        'La desviación estándar bajó a 7 puntos, indicando alta homogeneidad y cohesión en el aula.',
      ],
      retosUrgentes: [
        'El Nivel 4 (Avanzado) disminuyó al 3%; se requiere retar a los estudiantes con textos más densos.',
        'La competencia de reflexión crítica sobre intenciones y sesgos acumula el 47% de respuestas erróneas.',
      ],
      patronesDetectados: [
        'El colegio supera de manera consistente a Colombia (54 vs 53) y empata con los colegios oficiales urbanos de Bogotá.',
      ],
      metaTrienio: 'Elevar el Nivel 4 del 3% al 12% mediante talleres de argumentación e intertextualidad.',
    },
  },

  matematicas: {
    id: 'matematicas',
    nombre: 'Matemáticas',
    nombreCorto: 'Matemáticas',
    icono: 'Calculator',
    color: '#059669',
    escala: '0-100',
    descripcionAmigable:
      'Evalúa la aptitud para formular, aplicar e interpretar las matemáticas en situaciones cotidianas: finanzas, estadística, geometría y resolución de problemas prácticos.',
    propositoFormativo:
      'Desarrollar el razonamiento cuantitativo y la capacidad de tomar decisiones basadas en datos y lógica matemática.',
    queEvalua: [
      'Interpretación y representación (leer gráficos, tablas, porcentajes, esquemas)',
      'Formulación y ejecución (diseñar un plan de solución y calcular correctamente)',
      'Argumentación y validación (justificar por qué un procedimiento es verdadero o falso)',
    ],
    historico: [
      {
        period: '2018-2',
        promedio: { ee: 53, sede1: 53, colombia: 52, etc: 56, oficialesUrbanos: 53, oficialesRurales: 50, privados: 60 },
        desviacion: { ee: 8, sede1: 8, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 9, privados: 10 },
        niveles: { '1': 0, '2': 32, '3': 68, '4': 0 },
      },
      {
        period: '2019-4',
        promedio: { ee: 52, sede1: 52, colombia: 52, etc: 56, oficialesUrbanos: 53, oficialesRurales: 51, privados: 60 },
        desviacion: { ee: 8, sede1: 8, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 9, privados: 11 },
        niveles: { '1': 3, '2': 36, '3': 59, '4': 2 },
      },
      {
        period: '2020-4',
        promedio: { ee: 55, sede1: 55, colombia: 52, etc: 56, oficialesUrbanos: 53, oficialesRurales: 50, privados: 59 },
        desviacion: { ee: 8, sede1: 8, colombia: 11, etc: 10, oficialesUrbanos: 10, oficialesRurales: 9, privados: 10 },
        niveles: { '1': 0, '2': 26, '3': 73, '4': 1 },
      },
      {
        period: '2021-4',
        promedio: { ee: 52, sede1: 52, colombia: 51, etc: 55, oficialesUrbanos: 51, oficialesRurales: 48, privados: 59 },
        desviacion: { ee: 9, sede1: 9, colombia: 11, etc: 11, oficialesUrbanos: 10, oficialesRurales: 9, privados: 11 },
        niveles: { '1': 0, '2': 42, '3': 56, '4': 1 },
      },
      {
        period: '2022-4',
        promedio: { ee: 53, sede1: 53, colombia: 52, etc: 55, oficialesUrbanos: 53, oficialesRurales: 50, privados: 60 },
        desviacion: { ee: 9, sede1: 9, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 1, '2': 38, '3': 58, '4': 3 },
      },
      {
        period: '2023-4',
        promedio: { ee: 53, sede1: 53, colombia: 52, etc: 55, oficialesUrbanos: 53, oficialesRurales: 49, privados: 60 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 9, privados: 11 },
        niveles: { '1': 7, '2': 31, '3': 57, '4': 5 },
      },
      {
        period: '2024-3',
        promedio: { ee: 53, sede1: 53, colombia: 53, etc: 57, oficialesUrbanos: 54, oficialesRurales: 51, privados: 61 },
        desviacion: { ee: 11, sede1: 11, colombia: 13, etc: 11, oficialesUrbanos: 11, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 7, '2': 34, '3': 53, '4': 6 },
      },
      {
        period: '2025-3',
        promedio: { ee: 51, sede1: 51, colombia: 53, etc: 57, oficialesUrbanos: 54, oficialesRurales: 51, privados: 61 },
        desviacion: { ee: 9, sede1: 9, colombia: 13, etc: 12, oficialesUrbanos: 11, oficialesRurales: 11, privados: 12 },
        niveles: { '1': 3, '2': 42, '3': 53, '4': 1 },
      },
      {
        period: '2026-3',
        promedio: { ee: 49, sede1: 49, colombia: 52, etc: 54, oficialesUrbanos: 52, oficialesRurales: 50, privados: 59 },
        desviacion: { ee: 9, sede1: 9, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 7, '2': 47, '3': 46, '4': 0 },
      },
    ],
    aprendizajesEvaluados: [
      {
        id: 'mat-ap1',
        descripcion: 'Valida procedimientos y estrategias matemáticas utilizadas para dar solución a problemas',
        competencia: 'Argumentación y Validación',
        porcentajeIncorrectasEE: 62,
        porcentajeIncorrectasCol: 56,
        porcentajeIncorrectasETC: 53,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '¡Alerta clave! 62% de errores en justificar si un procedimiento es correcto y en encontrar contraejemplos.',
        estrategiaAula: [
          'Pedir habitualmente: "¿Por qué este paso es válido y qué ocurriría si modificamos una variable?".',
          'Ejercicios de detección de errores en cálculos resueltos para identificar fallas de lógica.',
          'Trabajar explícitamente el concepto de contraejemplo.',
        ],
      },
      {
        id: 'mat-ap2',
        descripcion: 'Frente a un problema cuantitativo, plantea e implementa estrategias que lleven a soluciones adecuadas',
        competencia: 'Formulación y Ejecución',
        porcentajeIncorrectasEE: 68,
        porcentajeIncorrectasCol: 65,
        porcentajeIncorrectasETC: 62,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '68% de respuestas erróneas: dificultad para traducir problemas verbales cotidianos a expresiones algebraicas o geométricas.',
        estrategiaAula: [
          'Método de Pólya: Comprender el problema -> Trazar plan -> Ejecutar -> Verificar resultado.',
          'Problemas contextualizados en finanzas personales, áreas de construcción y consumo de servicios.',
        ],
      },
      {
        id: 'mat-ap3',
        descripcion: 'Comprende y transforma la información cuantitativa y esquemática presentada en distintos formatos',
        competencia: 'Interpretación y Representación',
        porcentajeIncorrectasEE: 35,
        porcentajeIncorrectasCol: 39,
        porcentajeIncorrectasETC: 34,
        nivelRiesgo: 'favorable',
        recomendacionPedagogica: 'Mayor fortaleza matemática (35% de error): buena lectura directa de diagramas de barras y tablas.',
        estrategiaAula: [
          'Conectar la fluidez gráfica con la formulación algebraica de modelos.',
        ],
      },
    ],
    nivelesDescripcion: [
      {
        nivel: 'Nivel 1 (0-35)',
        rango: '0 a 35 pts',
        descripcion: 'Dificultad con operaciones aritméticas y proporcionalidad directa elemental.',
        estrategiaParaSuperar: 'Nivelación en fracciones, regla de tres, porcentajes y operaciones básicas.',
        colorClase: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        nivel: 'Nivel 2 (36-50)',
        rango: '36 a 50 pts',
        descripcion: 'Aplica algoritmos mecánicos pero se bloquea en problemas de más de dos pasos.',
        estrategiaParaSuperar: 'Problemas no rutinarios donde el alumno debe decidir qué operación aplicar sin indicársela de antemano.',
        colorClase: 'text-amber-800 bg-amber-50 border-amber-200',
      },
      {
        nivel: 'Nivel 3 (51-70)',
        rango: '51 a 70 pts',
        descripcion: 'Resuelve problemas de múltiples pasos, modela situaciones y calcula probabilidades con solidez.',
        estrategiaParaSuperar: 'Incentivar justificaciones formales y optimización matemática.',
        colorClase: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      },
      {
        nivel: 'Nivel 4 (71-100)',
        rango: '71 a 100 pts',
        descripcion: 'Modela situaciones abstractas complejas y propone métodos innovadores.',
        estrategiaParaSuperar: 'Olimpiadas y proyectos integrados STEM.',
        colorClase: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      },
    ],
    diagnosticoGeneral: {
      puntosFuertes: [
        'Solvencia en interpretación y lectura de gráficos y tablas estadísticas.',
        'Entre 2018 y 2024 se mantuvo con estabilidad entre 52 y 55 puntos.',
      ],
      retosUrgentes: [
        'En la cohorte 2026-3 el promedio cayó a 49 puntos y el Nivel 2 creció al 47%.',
        'La competencia de Formulación y Ejecución acumula 68% de respuestas erróneas.',
      ],
      patronesDetectados: [
        'Los estudiantes resuelven ejercicios algorítmicos estándar, pero fallan cuando deben diseñar la ruta de solución por cuenta propia.',
      ],
      metaTrienio: 'Reducir las respuestas erróneas en Formulación del 68% al 45% y elevar el puntaje medio a 54 puntos.',
    },
  },

  sociales_ciudadanas: {
    id: 'sociales_ciudadanas',
    nombre: 'Sociales y Ciudadanas',
    nombreCorto: 'Sociales',
    icono: 'Users',
    color: '#D97706',
    escala: '0-100',
    descripcionAmigable:
      'Evalúa la comprensión del mundo social, la Constitución de Colombia, derechos y deberes, y las múltiples perspectivas en dilemas y conflictos ciudadanos.',
    propositoFormativo:
      'Formar ciudadanos empáticos, participativos, defensores de los derechos humanos y capaces de analizar las dinámicas del país.',
    queEvalua: [
      'Pensamiento social (Constitución, instituciones del Estado, historia y territorio)',
      'Interpretación y análisis de perspectivas (intereses y visiones de diversos grupos)',
      'Pensamiento reflexivo y sistémico (causas, consecuencias e impactos económicos y sociales)',
    ],
    historico: [
      {
        period: '2018-2',
        promedio: { ee: 50, sede1: 50, colombia: 49, etc: 53, oficialesUrbanos: 50, oficialesRurales: 48, privados: 58 },
        desviacion: { ee: 10, sede1: 10, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 19, '2': 51, '3': 29, '4': 1 },
      },
      {
        period: '2019-4',
        promedio: { ee: 48, sede1: 48, colombia: 48, etc: 51, oficialesUrbanos: 49, oficialesRurales: 46, privados: 56 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 12, oficialesUrbanos: 11, oficialesRurales: 11, privados: 11 },
        niveles: { '1': 28, '2': 50, '3': 22, '4': 0 },
      },
      {
        period: '2020-4',
        promedio: { ee: 51, sede1: 51, colombia: 49, etc: 53, oficialesUrbanos: 50, oficialesRurales: 47, privados: 57 },
        desviacion: { ee: 10, sede1: 10, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 17, '2': 52, '3': 26, '4': 5 },
      },
      {
        period: '2021-4',
        promedio: { ee: 49, sede1: 49, colombia: 48, etc: 52, oficialesUrbanos: 49, oficialesRurales: 46, privados: 56 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 12, oficialesUrbanos: 11, oficialesRurales: 10, privados: 11 },
        niveles: { '1': 21, '2': 47, '3': 31, '4': 1 },
      },
      {
        period: '2022-4',
        promedio: { ee: 51, sede1: 51, colombia: 48, etc: 53, oficialesUrbanos: 50, oficialesRurales: 47, privados: 57 },
        desviacion: { ee: 10, sede1: 10, colombia: 12, etc: 11, oficialesUrbanos: 11, oficialesRurales: 11, privados: 11 },
        niveles: { '1': 13, '2': 51, '3': 35, '4': 1 },
      },
      {
        period: '2023-4',
        promedio: { ee: 50, sede1: 50, colombia: 49, etc: 53, oficialesUrbanos: 50, oficialesRurales: 46, privados: 57 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 9, privados: 11 },
        niveles: { '1': 22, '2': 49, '3': 25, '4': 4 },
      },
      {
        period: '2024-3',
        promedio: { ee: 48, sede1: 48, colombia: 49, etc: 53, oficialesUrbanos: 50, oficialesRurales: 48, privados: 57 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 10, oficialesUrbanos: 10, oficialesRurales: 11, privados: 11 },
        niveles: { '1': 29, '2': 47, '3': 22, '4': 2 },
      },
      {
        period: '2025-3',
        promedio: { ee: 49, sede1: 49, colombia: 49, etc: 52, oficialesUrbanos: 49, oficialesRurales: 47, privados: 57 },
        desviacion: { ee: 9, sede1: 9, colombia: 12, etc: 12, oficialesUrbanos: 11, oficialesRurales: 11, privados: 11 },
        niveles: { '1': 17, '2': 59, '3': 24, '4': 0 },
      },
      {
        period: '2026-3',
        promedio: { ee: 52, sede1: 52, colombia: 50, etc: 53, oficialesUrbanos: 50, oficialesRurales: 48, privados: 57 },
        desviacion: { ee: 7, sede1: 7, colombia: 11, etc: 10, oficialesUrbanos: 10, oficialesRurales: 9, privados: 10 },
        niveles: { '1': 9, '2': 60, '3': 31, '4': 0 },
      },
    ],
    aprendizajesEvaluados: [
      {
        id: 'soc-ap1',
        descripcion: 'Comprende que los problemas y soluciones involucran distintas dimensiones y reconoce sus relaciones',
        competencia: 'Pensamiento Sistémico',
        porcentajeIncorrectasEE: 60,
        porcentajeIncorrectasCol: 61,
        porcentajeIncorrectasETC: 53,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '60% de error: les cuesta evaluar cómo una medida económica afecta a comunidades vulnerables o ecosistemas.',
        estrategiaAula: [
          'Estudios de caso sobre movilidad, minería o reformas tributarias.',
          'Debates de rol (comunidad, Estado, gremio empresarial, defensores de DDHH).',
        ],
      },
      {
        id: 'soc-ap2',
        descripcion: 'Evalúa usos sociales de las ciencias sociales (impactos de decisiones políticas)',
        competencia: 'Pensamiento Social',
        porcentajeIncorrectasEE: 51,
        porcentajeIncorrectasCol: 55,
        porcentajeIncorrectasETC: 43,
        nivelRiesgo: 'medio',
        recomendacionPedagogica: '51% de error en comprender los efectos a mediano plazo de políticas públicas.',
        estrategiaAula: [
          'Análisis crítico de leyes y noticias nacionales recientes.',
        ],
      },
      {
        id: 'soc-ap3',
        descripcion: 'Comprende perspectivas de distintos actores y grupos sociales',
        competencia: 'Perspectivas Ciudadanas',
        porcentajeIncorrectasEE: 38,
        porcentajeIncorrectasCol: 43,
        porcentajeIncorrectasETC: 35,
        nivelRiesgo: 'favorable',
        recomendacionPedagogica: 'Buena empatía ciudadana frente a minorías y resolución no violenta de conflictos.',
        estrategiaAula: [
          'Fortalecer el análisis de intereses económicos implícitos en discursos políticos.',
        ],
      },
    ],
    nivelesDescripcion: [
      {
        nivel: 'Nivel 1 (0-35)',
        rango: '0 a 35 pts',
        descripcion: 'Desconocimiento de mecanismos constitucionales y estructura del Estado.',
        estrategiaParaSuperar: 'Lectura vivencial de la Constitución: derechos fundamentales, acción de tutela y ramas del poder.',
        colorClase: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        nivel: 'Nivel 2 (36-50)',
        rango: '36 a 50 pts',
        descripcion: 'Conoce conceptos básicos pero tropieza cuando entran en conflicto dos derechos legítimos.',
        estrategiaParaSuperar: 'Dilemas morales y deliberación democrática en clase.',
        colorClase: 'text-amber-800 bg-amber-50 border-amber-200',
      },
      {
        nivel: 'Nivel 3 (51-65)',
        rango: '51 a 65 pts',
        descripcion: 'Comprende procesos históricos, dinámicas territoriales y evalúa argumentos con solvencia.',
        estrategiaParaSuperar: 'Geopolítica contemporánea y análisis de modelos de desarrollo.',
        colorClase: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      },
      {
        nivel: 'Nivel 4 (66-100)',
        rango: '66 a 100 pts',
        descripcion: 'Pensamiento social integral y reflexivo en problemáticas complejas.',
        estrategiaParaSuperar: 'Modelos ONU y formulación de iniciativas ciudadanas.',
        colorClase: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      },
    ],
    diagnosticoGeneral: {
      puntosFuertes: [
        'En la última aplicación 2026-3 el promedio subió a 52 puntos, superando a Colombia (50).',
        'El Nivel 1 cayó drásticamente de 29% a 9% en la última cohorte.',
      ],
      retosUrgentes: [
        'El Nivel 2 concentra el 60% de los estudiantes; se requiere empujarlos hacia el Nivel 3.',
        'Debilidad en pensamiento sistémico (comprender repercusiones cruzadas entre economía y derechos).',
      ],
      patronesDetectados: [
        'Excelente comprensión de la empatía cotidiana, pero falta rigor técnico en institucionalidad y legislación.',
      ],
      metaTrienio: 'Migrar un 20% de estudiantes de Nivel 2 a Nivel 3 consolidando estudios de caso.',
    },
  },

  ciencias_naturales: {
    id: 'ciencias_naturales',
    nombre: 'Ciencias Naturales',
    nombreCorto: 'Ciencias',
    icono: 'Atom',
    color: '#0891B2',
    escala: '0-100',
    descripcionAmigable:
      'Evalúa la capacidad de comprender y aplicar conocimientos de Biología, Química, Física y Ciencia-Tecnología-Sociedad (CTS) para investigar fenómenos e interpretar experimentos.',
    propositoFormativo:
      'Desarrollar el pensamiento científico, la curiosidad empírica, el rigor de evidencia y la conciencia ecológica.',
    queEvalua: [
      'Uso comprensivo del conocimiento científico (leyes de física, química y biología)',
      'Explicación de fenómenos (argumentar razones basadas en evidencia y modelos)',
      'Indagación (diseñar experimentos, controlar variables y analizar datos)',
    ],
    historico: [
      {
        period: '2018-2',
        promedio: { ee: 53, sede1: 53, colombia: 51, etc: 54, oficialesUrbanos: 52, oficialesRurales: 49, privados: 58 },
        desviacion: { ee: 7, sede1: 7, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 8, privados: 9 },
        niveles: { '1': 7, '2': 53, '3': 40, '4': 0 },
      },
      {
        period: '2019-4',
        promedio: { ee: 51, sede1: 51, colombia: 50, etc: 53, oficialesUrbanos: 50, oficialesRurales: 49, privados: 57 },
        desviacion: { ee: 7, sede1: 7, colombia: 11, etc: 10, oficialesUrbanos: 9, oficialesRurales: 8, privados: 10 },
        niveles: { '1': 9, '2': 63, '3': 28, '4': 0 },
      },
      {
        period: '2020-4',
        promedio: { ee: 52, sede1: 52, colombia: 49, etc: 52, oficialesUrbanos: 50, oficialesRurales: 47, privados: 56 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 8, privados: 10 },
        niveles: { '1': 7, '2': 59, '3': 33, '4': 1 },
      },
      {
        period: '2021-4',
        promedio: { ee: 51, sede1: 51, colombia: 49, etc: 52, oficialesUrbanos: 50, oficialesRurales: 47, privados: 57 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 8, privados: 10 },
        niveles: { '1': 17, '2': 54, '3': 28, '4': 1 },
      },
      {
        period: '2022-4',
        promedio: { ee: 53, sede1: 53, colombia: 50, etc: 53, oficialesUrbanos: 51, oficialesRurales: 49, privados: 57 },
        desviacion: { ee: 8, sede1: 8, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 10 },
        niveles: { '1': 6, '2': 60, '3': 32, '4': 1 },
      },
      {
        period: '2023-4',
        promedio: { ee: 51, sede1: 51, colombia: 50, etc: 53, oficialesUrbanos: 51, oficialesRurales: 49, privados: 57 },
        desviacion: { ee: 10, sede1: 10, colombia: 10, etc: 10, oficialesUrbanos: 9, oficialesRurales: 8, privados: 10 },
        niveles: { '1': 17, '2': 51, '3': 29, '4': 4 },
      },
      {
        period: '2024-3',
        promedio: { ee: 50, sede1: 50, colombia: 51, etc: 54, oficialesUrbanos: 52, oficialesRurales: 50, privados: 58 },
        desviacion: { ee: 9, sede1: 9, colombia: 11, etc: 10, oficialesUrbanos: 9, oficialesRurales: 10, privados: 10 },
        niveles: { '1': 14, '2': 56, '3': 29, '4': 1 },
      },
      {
        period: '2025-3',
        promedio: { ee: 51, sede1: 51, colombia: 52, etc: 54, oficialesUrbanos: 52, oficialesRurales: 49, privados: 59 },
        desviacion: { ee: 8, sede1: 8, colombia: 11, etc: 10, oficialesUrbanos: 9, oficialesRurales: 9, privados: 10 },
        niveles: { '1': 14, '2': 55, '3': 32, '4': 0 },
      },
      {
        period: '2026-3',
        promedio: { ee: 52, sede1: 52, colombia: 51, etc: 54, oficialesUrbanos: 52, oficialesRurales: 50, privados: 57 },
        desviacion: { ee: 9, sede1: 9, colombia: 10, etc: 9, oficialesUrbanos: 8, oficialesRurales: 8, privados: 9 },
        niveles: { '1': 16, '2': 47, '3': 37, '4': 0 },
      },
    ],
    aprendizajesEvaluados: [
      {
        id: 'cn-ap1',
        descripcion: 'Explicar cómo ocurren algunos fenómenos de la naturaleza basado en observaciones y conceptos (Física/Química)',
        competencia: 'Explicación de Fenómenos',
        porcentajeIncorrectasEE: 63,
        porcentajeIncorrectasCol: 62,
        porcentajeIncorrectasETC: 60,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '63% de error: tropiezos con reacciones químicas, conservación de energía y leyes dinámicas.',
        estrategiaAula: [
          'Uso de simuladores interactivos (PhET Colorado) para visualizar átomos y movimiento.',
          'Experimentos guiados donde los estudiantes predicen resultados antes de ejecutar.',
        ],
      },
      {
        id: 'cn-ap2',
        descripcion: 'Modelar fenómenos de la naturaleza basado en el análisis de variables y relación entre conceptos',
        competencia: 'Indagación y Modelación',
        porcentajeIncorrectasEE: 64,
        porcentajeIncorrectasCol: 65,
        porcentajeIncorrectasETC: 62,
        nivelRiesgo: 'critico',
        recomendacionPedagogica: '64% de error en modelar procesos físicos y químicos a partir de gráficos experimentales.',
        estrategiaAula: [
          'Prácticas de laboratorio con identificación explícita de variable independiente y dependiente.',
          'Interpretación de gráficos de calentamiento, solubilidad y cinemática.',
        ],
      },
      {
        id: 'cn-ap3',
        descripcion: 'Analizar el potencial del uso de recursos naturales o artefactos y sus efectos en el entorno (CTS)',
        competencia: 'Ciencia, Tecnología y Sociedad',
        porcentajeIncorrectasEE: 38,
        porcentajeIncorrectasCol: 38,
        porcentajeIncorrectasETC: 30,
        nivelRiesgo: 'favorable',
        recomendacionPedagogica: 'Área de mejor respuesta: comprensión ecológica y reciclaje.',
        estrategiaAula: [
          'Articular el Proyecto Ambiental Escolar (PRAE) con preguntas de indagación.',
        ],
      },
    ],
    nivelesDescripcion: [
      {
        nivel: 'Nivel 1 (0-35)',
        rango: '0 a 35 pts',
        descripcion: 'Dificultad con nociones elementales del método científico y vocabulario técnico.',
        estrategiaParaSuperar: 'Refuerzo de conceptos básicos de materia, seres vivos y mediciones elementales.',
        colorClase: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        nivel: 'Nivel 2 (36-50)',
        rango: '36 a 50 pts',
        descripcion: 'Reconoce términos pero falla al predecir cambios cuando se modifica una condición experimental.',
        estrategiaParaSuperar: 'Ejercicios de "¿Qué pasará si aumentamos la presión o la concentración?".',
        colorClase: 'text-amber-800 bg-amber-50 border-amber-200',
      },
      {
        nivel: 'Nivel 3 (51-65)',
        rango: '51 a 65 pts',
        descripcion: 'Interpreta tablas y gráficos científicos, formula hipótesis y deriva conclusiones válidas.',
        estrategiaParaSuperar: 'Diseño autónomo de protocolos experimentales.',
        colorClase: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      },
      {
        nivel: 'Nivel 4 (66-100)',
        rango: '66 a 100 pts',
        descripcion: 'Modela sistemas complejos multifactoriales y evalúa impactos biotecnológicos.',
        estrategiaParaSuperar: 'Lectura de artículos científicos y proyectos de investigación escolar.',
        colorClase: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      },
    ],
    diagnosticoGeneral: {
      puntosFuertes: [
        'Desempeño promedio estable (51-53) superando la media nacional de colegios oficiales.',
        'Sólida conciencia ambiental en el componente CTS.',
      ],
      retosUrgentes: [
        'El Nivel 1 aumentó al 16% en la cohorte 2026; requiere intervención pronta en grados 10° y 11°.',
        'Modelación de variables físicas y químicas tiene 64% de respuestas erróneas.',
      ],
      patronesDetectados: [
        'La ciencia se enseña frecuentemente de forma expositiva teórica; el examen ICFES mide indagación empírica y lectura de evidencia.',
      ],
      metaTrienio: 'Reducir el Nivel 1 al 7% e incrementar el Nivel 3 a más del 45%.',
    },
  },

  ingles: {
    id: 'ingles',
    nombre: 'Inglés',
    nombreCorto: 'Inglés',
    icono: 'Languages',
    color: '#7C3AED',
    escala: '0-100',
    descripcionAmigable:
      'Evalúa la competencia comunicativa lectora en lengua inglesa según el Marco Común Europeo: niveles A- (principiante absoluto), A1, A2, B1 y B+.',
    propositoFormativo:
      'Brindar herramientas de acceso al conocimiento global, tecnología y oportunidades académicas y laborales.',
    queEvalua: [
      'Parte 1: Avisos y carteles cotidianos',
      'Parte 2: Definiciones y vocabulario por categorías',
      'Parte 3: Conversaciones cortas y pragmática',
      'Parte 4: Textos con lagunas gramaticales',
      'Parte 5 y 6: Lectura literal e inferencial',
      'Parte 7: Textos complejos con opciones léxicas',
    ],
    historico: [
      {
        period: '2018-2',
        promedio: { ee: 51, sede1: 51, colombia: 52, etc: 57, oficialesUrbanos: 53, oficialesRurales: 48, privados: 63 },
        desviacion: { ee: 9, sede1: 9, colombia: 11, etc: 11, oficialesUrbanos: 9, oficialesRurales: 8, privados: 12 },
        niveles: { 'A-': 39, 'A1': 41, 'A2': 16, 'B1': 3, 'B+': 1 },
      },
      {
        period: '2019-4',
        promedio: { ee: 50, sede1: 50, colombia: 50, etc: 56, oficialesUrbanos: 51, oficialesRurales: 47, privados: 62 },
        desviacion: { ee: 9, sede1: 9, colombia: 12, etc: 12, oficialesUrbanos: 10, oficialesRurales: 10, privados: 12 },
        niveles: { 'A-': 39, 'A1': 41, 'A2': 19, 'B1': 2, 'B+': 0 },
      },
      {
        period: '2020-4',
        promedio: { ee: 48, sede1: 48, colombia: 48, etc: 52, oficialesUrbanos: 48, oficialesRurales: 44, privados: 57 },
        desviacion: { ee: 8, sede1: 8, colombia: 12, etc: 11, oficialesUrbanos: 10, oficialesRurales: 8, privados: 13 },
        niveles: { 'A-': 61, 'A1': 26, 'A2': 12, 'B1': 1, 'B+': 0 },
      },
      {
        period: '2021-4',
        promedio: { ee: 52, sede1: 52, colombia: 50, etc: 56, oficialesUrbanos: 51, oficialesRurales: 46, privados: 63 },
        desviacion: { ee: 12, sede1: 12, colombia: 13, etc: 13, oficialesUrbanos: 11, oficialesRurales: 9, privados: 13 },
        niveles: { 'A-': 38, 'A1': 28, 'A2': 19, 'B1': 14, 'B+': 0 },
      },
      {
        period: '2022-4',
        promedio: { ee: 52, sede1: 52, colombia: 51, etc: 57, oficialesUrbanos: 52, oficialesRurales: 48, privados: 63 },
        desviacion: { ee: 12, sede1: 12, colombia: 13, etc: 13, oficialesUrbanos: 11, oficialesRurales: 10, privados: 13 },
        niveles: { 'A-': 35, 'A1': 35, 'A2': 18, 'B1': 10, 'B+': 1 },
      },
      {
        period: '2023-4',
        promedio: { ee: 52, sede1: 52, colombia: 52, etc: 57, oficialesUrbanos: 53, oficialesRurales: 48, privados: 63 },
        desviacion: { ee: 11, sede1: 11, colombia: 12, etc: 13, oficialesUrbanos: 11, oficialesRurales: 9, privados: 13 },
        niveles: { 'A-': 37, 'A1': 34, 'A2': 18, 'B1': 10, 'B+': 1 },
      },
      {
        period: '2024-3',
        promedio: { ee: 53, sede1: 53, colombia: 52, etc: 58, oficialesUrbanos: 54, oficialesRurales: 49, privados: 65 },
        desviacion: { ee: 12, sede1: 12, colombia: 13, etc: 13, oficialesUrbanos: 11, oficialesRurales: 10, privados: 13 },
        niveles: { 'A-': 34, 'A1': 30, 'A2': 27, 'B1': 8, 'B+': 1 },
      },
      {
        period: '2025-3',
        promedio: { ee: 52, sede1: 52, colombia: 53, etc: 58, oficialesUrbanos: 54, oficialesRurales: 49, privados: 65 },
        desviacion: { ee: 9, sede1: 9, colombia: 13, etc: 13, oficialesUrbanos: 11, oficialesRurales: 10, privados: 12 },
        niveles: { 'A-': 26, 'A1': 47, 'A2': 24, 'B1': 3, 'B+': 0 },
      },
      {
        period: '2026-3',
        promedio: { ee: 54, sede1: 54, colombia: 53, etc: 58, oficialesUrbanos: 54, oficialesRurales: 51, privados: 64 },
        desviacion: { ee: 10, sede1: 10, colombia: 12, etc: 12, oficialesUrbanos: 10, oficialesRurales: 9, privados: 12 },
        niveles: { 'A-': 28, 'A1': 38, 'A2': 24, 'B1': 7, 'B+': 3 },
      },
    ],
    nivelesDescripcion: [
      {
        nivel: 'Nivel A- (Menor a A1)',
        rango: '0 a 47 pts',
        descripcion: 'No comprende frases simples ni vocabulario común en carteles cotidianos.',
        estrategiaParaSuperar: 'Inmersión inicial con flashcards, canciones con letra y rutinas diarias en inglés.',
        colorClase: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        nivel: 'Nivel A1 (Principiante)',
        rango: '48 a 57 pts',
        descripcion: 'Comprende expresiones cotidianas de saludo y descripciones breves.',
        estrategiaParaSuperar: 'Diálogos cortos guiados y lectura de cómics con apoyo visual.',
        colorClase: 'text-amber-800 bg-amber-50 border-amber-200',
      },
      {
        nivel: 'Nivel A2 (Básico)',
        rango: '58 a 67 pts',
        descripcion: 'Comprende textos breves sobre compras, familia, pasatiempos y colegio.',
        estrategiaParaSuperar: 'Redacción de párrafos y audios de noticias adaptadas.',
        colorClase: 'text-blue-800 bg-blue-50 border-blue-200',
      },
      {
        nivel: 'Nivel B1 (Pre-Intermedio)',
        rango: '68 a 78 pts',
        descripcion: 'Comprende puntos principales de textos claros sobre asuntos laborales y académicos.',
        estrategiaParaSuperar: 'Debates breves en inglés sobre temas juveniles y ensayos cortos.',
        colorClase: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      },
      {
        nivel: 'Nivel B+ (Intermedio Superior)',
        rango: '79 a 100 pts',
        descripcion: 'Comprende textos complejos y abstractos con naturalidad y fluidez.',
        estrategiaParaSuperar: 'Preparación para certificaciones internacionales (B2/C1).',
        colorClase: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      },
    ],
    diagnosticoGeneral: {
      puntosFuertes: [
        'Evolución positiva: El nivel A- cayó del 61% en 2020 al 28% en 2026.',
        'El promedio subió a 54 puntos, superando el promedio nacional de Colombia (53).',
      ],
      retosUrgentes: [
        'Aún el 66% de la promoción (A- y A1) está en niveles principiantes.',
        'Brecha amplia con colegios privados (64 vs 54 puntos).',
      ],
      patronesDetectados: [
        'Buen puntaje en preguntas con imágenes (Partes 1 y 2), pero caída en preguntas de cloze gramatical (Parte 4) y lectura extendida (Partes 6 y 7).',
      ],
      metaTrienio: 'Reducir el nivel A- al 15% y consolidar al menos un 20% de alumnos en B1 y B+.',
    },
  },
};

export const GLOSARIO_ICFES = [
  {
    termino: 'Puntaje Global (0 a 500)',
    definicionSimple: 'Es la calificación general ponderada del estudiante en las 5 pruebas obligatorias. El promedio histórico nacional se fijó en 250 puntos.',
    metafora: 'Como el promedio del semestre en la universidad: resume tu rendimiento integral en una sola cifra.',
    enElColegio: 'El Gustavo Restrepo se mantiene en el rango 255-265 puntos, superando el promedio nacional de Colombia (250-260).',
  },
  {
    termino: 'Puntaje de Área (0 a 100)',
    definicionSimple: 'Es el resultado en cada materia específica (Lectura, Matemáticas, Sociales, Ciencias, Inglés). La media nacional está estandarizada en 50 puntos con desviación 10.',
    metafora: 'Si sacas más de 50, estás por encima de la mitad de Colombia. Si sacas menos de 50, estás por debajo.',
    enElColegio: 'Nuestras materias más fuertes suelen ser Lectura Crítica (54-56) e Inglés reciente (54). Matemáticas cayó recientemente a 49.',
  },
  {
    termino: 'Desviación Estándar (La brecha del salón)',
    definicionSimple: 'Mide qué tan dispersos o desiguales están los puntajes respecto al promedio. Una desviación baja significa que la mayoría de estudiantes aprenden al mismo ritmo; una desviación alta revela una gran brecha entre los que van volando y los que se quedan atrás.',
    metafora: 'Si en un salón todos sacan entre 48 y 52, la desviación es casi 0 (todos parejos). Si la mitad saca 10 y la otra mitad saca 90, el promedio da 50, pero la desviación es gigante (el salón está roto en dos).',
    enElColegio: 'Nuestra desviación en Lectura es excelente (7-9 puntos), lo que significa que el grupo avanza unido. En Matemáticas e Inglés sube a 11-12, mostrando que hay grupos que requieren refuerzo urgente.',
  },
  {
    termino: 'Niveles de Desempeño (1 al 4)',
    definicionSimple: 'Clasificación cualitativa de lo que el estudiante SABE y SABE HACER con ese conocimiento. Nivel 1 (insuficiente), Nivel 2 (mínimo), Nivel 3 (satisfactorio), Nivel 4 (avanzado). En Inglés se mide en A-, A1, A2, B1, B+.',
    metafora: 'Cinturones en artes marciales: Nivel 1 es principiante que apenas reconoce el tatami, Nivel 3 ya compite con solvencia y Nivel 4 es cinturón negro.',
    enElColegio: 'Nuestra gran meta pedagógica siempre es sacar a los estudiantes del Nivel 1 y 2 para consolidarlos en Nivel 3 y 4.',
  },
  {
    termino: 'Símbolos ICFES (Triángulos y Círculos)',
    definicionSimple: 'El ICFES compara estadísticamente si un cambio entre cohortes es significativo: Triángulo verde hacia arriba = Mejora real considerable; Triángulo rojo hacia abajo = Caída preocupante; Círculo gris/azul = Cambio no significativo (rendimiento similar).',
    metafora: 'Un semáforo inteligente que te avisa si el cambio de puntaje se debe al azar o si realmente hubo un avance pedagógico comprobable.',
    enElColegio: 'En los reportes podemos ver que el Gustavo Restrepo mantiene estabilidad ("similar") en la mayoría de años con picos verdes de avance en Lectura y Sociales.',
  },
  {
    termino: 'Aprendizajes y Respuestas Incorrectas',
    definicionSimple: 'El ICFES desglosa exactamente en qué temas o habilidades fallaron los estudiantes (% de respuestas incorrectas). Te muestra la "radiografía" precisa del salón.',
    metafora: 'El diagnóstico médico detallado: no solo te dice que tienes fiebre, sino exactamente qué bacteria la causó para darte el antibiótico correcto.',
    enElColegio: 'Gracias a esto sabemos con certeza que en Matemáticas el 68% falla en formular planes de solución, y en Ciencias el 64% falla en modelar variables.',
  },
];
