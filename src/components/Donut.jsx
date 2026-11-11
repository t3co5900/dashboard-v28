import { useState } from 'react'
import { traffic } from '../data.js'

const R = 54
const C = 2 * Math.PI * R

export default function Donut() {
  const [active, setActive] = useState(null)
  const total = traffic.reduce((a, b) => a + b.value, 0)
  let offset = 0
  const shown = active !== null ? traffic[active] : null

  return (
    <section className="glass panel" style={{ '--i': 5 }}>
      <header className="panel-head">
        <div>
          <h2>Fuentes de tráfico</h2>
          <p className="muted">Últimos 30 días</p>
        </div>
      </header>

      <div className="donut-row">
        <div className="donut">
          <svg viewBox="0 0 140 140" role="img" aria-label="Distribución de tráfico por fuente">
            <circle cx="70" cy="70" r={R} className="donut-track" />
            {traffic.map((t, i) => {
              const len = (t.value / total) * C
              const seg = (
                <circle
                  key={t.label}
                  cx="70"
                  cy="70"
                  r={R}
                  className={`donut-seg ${active === i ? 'hot' : ''} ${active !== null && active !== i ? 'dim' : ''}`}
                  stroke={t.color}
                  strokeDasharray={`${Math.max(len - 3, 0)} ${C}`}
                  strokeDashoffset={-offset}
                  style={{ '--d': `${i * 120}ms` }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                />
              )
              offset += len
              return seg
            })}
          </svg>
          <div className="donut-center">
            <strong>{shown ? `${shown.value}%` : '100%'}</strong>
            <span>{shown ? shown.label : 'Total'}</span>
          </div>
        </div>

        <ul className="legend">
          {traffic.map((t, i) => (
            <li
              key={t.label}
              className={active === i ? 'on' : ''}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <i style={{ background: t.color }} />
              <span>{t.label}</span>
              <b>{t.value}%</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
