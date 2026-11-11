import { useState } from 'react'
import { team } from '../data.js'

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'online', label: 'En línea' },
  { id: 'away', label: 'Ausentes' },
]

const initials = (n) =>
  n
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export default function Team() {
  const [f, setF] = useState('all')
  const list = team.filter((m) => f === 'all' || m.status === f)

  return (
    <section className="glass panel team" style={{ '--i': 7 }}>
      <header className="panel-head">
        <div>
          <h2>Equipo</h2>
          <p className="muted">{team.length} personas · avance del sprint</p>
        </div>
        <div className="chips">
          {filters.map((x) => (
            <button key={x.id} className={f === x.id ? 'on' : ''} onClick={() => setF(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      </header>

      <ul className="people">
        {list.map((m, i) => (
          <li key={m.name} className="person" style={{ '--n': i }}>
            <div className="avatar" data-s={m.status}>
              {initials(m.name)}
            </div>
            <div className="who">
              <strong>{m.name}</strong>
              <span className="muted">{m.role}</span>
            </div>
            <div className="prog" aria-label={`Avance ${m.progress}%`}>
              <div className="prog-bar">
                <i style={{ '--w': `${m.progress}%` }} />
              </div>
              <b>{m.progress}%</b>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
