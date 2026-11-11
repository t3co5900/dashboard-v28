import { useState } from 'react'
import { weekly } from '../data.js'

export default function BarChart() {
  const [sel, setSel] = useState(3)
  return (
    <section className="glass panel" style={{ '--i': 6 }}>
      <header className="panel-head">
        <div>
          <h2>Actividad semanal</h2>
          <p className="muted">Sesiones por día (miles)</p>
        </div>
        <span className="pill">{weekly[sel].value}k</span>
      </header>

      <div className="bars" role="group" aria-label="Sesiones por día">
        {weekly.map((d, i) => (
          <button
            key={d.day}
            className={`bar ${sel === i ? 'on' : ''}`}
            style={{ '--h': `${d.value}%`, '--d': `${i * 70}ms` }}
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
            aria-label={`${d.day}: ${d.value} mil sesiones`}
          >
            <span className="bar-fill" />
            <span className="bar-day">{d.day}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
