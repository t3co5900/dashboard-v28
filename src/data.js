// Datos de ejemplo. Reemplazar por datos reales cuando haya fuente.

export const stats = [
  { id: 'rev', label: 'Ingresos', value: 48250, prefix: '$', delta: 12.4, spark: [22, 28, 25, 34, 31, 40, 38, 47, 52] },
  { id: 'users', label: 'Usuarios activos', value: 12480, delta: 8.1, spark: [30, 32, 31, 38, 36, 42, 45, 44, 50] },
  { id: 'conv', label: 'Conversión', value: 3.8, suffix: '%', decimals: 1, delta: -0.6, spark: [44, 41, 45, 40, 42, 38, 39, 36, 37] },
  { id: 'orders', label: 'Pedidos', value: 1862, delta: 5.3, spark: [18, 22, 20, 27, 25, 29, 33, 31, 36] },
]

export const ranges = {
  '7D': {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    values: [3200, 4100, 3800, 5200, 4700, 6100, 5600],
  },
  '30D': {
    labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    values: [14200, 16800, 15400, 19800, 18200, 22600, 21000, 25400],
  },
  '12M': {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    values: [31, 36, 33, 41, 46, 44, 52, 58, 55, 63, 68, 74].map((v) => v * 1000),
  },
}

export const traffic = [
  { label: 'Orgánico', value: 42, color: '#2563eb' },
  { label: 'Directo', value: 27, color: '#38bdf8' },
  { label: 'Referidos', value: 19, color: '#818cf8' },
  { label: 'Social', value: 12, color: '#bfdbfe' },
]

export const weekly = [
  { day: 'L', value: 62 },
  { day: 'M', value: 78 },
  { day: 'X', value: 55 },
  { day: 'J', value: 91 },
  { day: 'V', value: 84 },
  { day: 'S', value: 47 },
  { day: 'D', value: 38 },
]

export const team = [
  { name: 'Valentina Ríos', role: 'Diseño de producto', progress: 86, status: 'online' },
  { name: 'Mateo Suárez', role: 'Ingeniería frontend', progress: 72, status: 'online' },
  { name: 'Camila Duarte', role: 'Analítica de datos', progress: 64, status: 'away' },
  { name: 'Joaquín Mena', role: 'Ingeniería backend', progress: 91, status: 'online' },
  { name: 'Lucía Ferraro', role: 'Marketing', progress: 48, status: 'away' },
]

export const activity = [
  { text: 'Nuevo cliente registrado', meta: 'Hace 4 min', tone: 'blue' },
  { text: 'Informe mensual generado', meta: 'Hace 22 min', tone: 'sky' },
  { text: 'Pago de $2.400 confirmado', meta: 'Hace 1 h', tone: 'indigo' },
  { text: 'Mateo desplegó la versión 28.1', meta: 'Hace 3 h', tone: 'blue' },
]
