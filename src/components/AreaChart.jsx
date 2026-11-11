import { useMemo, useRef, useState } from 'react'
import { ranges } from '../data.js'

const W = 640
const H = 260
const PAD = { t: 18, r: 16, b: 30, l: 16 }

function smooth(points) {
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const cx = (a.x + b.x) / 2
    d += ` C${cx},${a.y} ${cx},${b.y} ${b.x},${b.y}`
  }
  return d
}

const fmt = (v) => '$' + v.toLocaleString('es-AR')

export default function AreaChart() {
  const [range, setRange] = useState('12M')
  const [hover, setHover] = useState(null)
  const ref = useRef(null)
  const { labels, values } = ranges[range]

  const pts = useMemo(() => {
    const max = Math.max(...values) * 1.1
    const min = Math.min(...values) * 0.8
    return values.map((v, i) => ({
      x: PAD.l + (i / (values.length - 1)) * (W - PAD.l - PAD.r),
      y: PAD.t + (1 - (v - min) / (max - min)) * (H - PAD.t - PAD.b),
    }))
  }, [values])

  const line = smooth(pts)
  const area = `${line} L${pts[pts.length - 1].x},${H - PAD.b} L${pts[0].x},${H - PAD.b} Z`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * W
    let best = 0
    pts.forEach((p, i) => {
      if (Math.abs(p.x - x) < Math.abs(pts[best].x - x)) best = i
    })
    setHover(best)
  }

  const total = values.reduce((a, b) => a + b, 0)

  return (
    <section className="glass panel area" style={{ '--i': 4 }}>
      <header className="panel-head">
        <div>
          <h2>Rendimiento de ingresos</h2>
          <p className="muted">Total del período: {fmt(total)}</p>
        </div>
        <div className="segmented" role="tablist" aria-label="Rango de tiempo">
          {Object.keys(ranges).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={range === r}
              className={range === r ? 'on' : ''}
              onClick={() => {
                setRange(r)
                setHover(null)
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div className="chart-wrap">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className="area-svg"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label={`Gráfico de ingresos, rango ${range}`}
        >
          <defs>
            <linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="strokeBlue" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              className="grid-line"
              x1={PAD.l}
              x2={W - PAD.r}
              y1={PAD.t + g * (H - PAD.t - PAD.b)}
              y2={PAD.t + g * (H - PAD.t - PAD.b)}
            />
          ))}

          <path key={`a-${range}`} className="area-fill" d={area} fill="url(#fillBlue)" />
          <path key={`l-${range}`} className="area-line" d={line} pathLength="1" stroke="url(#strokeBlue)" />

          {labels.map((l, i) => (
            <text key={l} x={pts[i].x} y={H - 8} textAnchor="middle" className="axis">
              {l}
            </text>
          ))}

          {hover !== null && (
            <g>
              <line className="cursor" x1={pts[hover].x} x2={pts[hover].x} y1={PAD.t} y2={H - PAD.b} />
              <circle className="dot-halo" cx={pts[hover].x} cy={pts[hover].y} r="10" />
              <circle className="dot" cx={pts[hover].x} cy={pts[hover].y} r="5" />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="tooltip"
            style={{
              left: `${(pts[hover].x / W) * 100}%`,
              top: `${(pts[hover].y / H) * 100}%`,
            }}
          >
            <strong>{fmt(values[hover])}</strong>
            <span>{labels[hover]}</span>
          </div>
        )}
      </div>
    </section>
  )
}
