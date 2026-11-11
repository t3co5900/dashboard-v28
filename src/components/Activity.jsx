import { activity } from '../data.js'

export default function Activity() {
  return (
    <section className="glass panel" style={{ '--i': 8 }}>
      <header className="panel-head">
        <div>
          <h2>Actividad reciente</h2>
          <p className="muted">Lo último que pasó</p>
        </div>
      </header>
      <ul className="feed">
        {activity.map((a) => (
          <li key={a.text}>
            <i className={`tone ${a.tone}`} />
            <div>
              <strong>{a.text}</strong>
              <span className="muted">{a.meta}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
