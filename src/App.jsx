import { useState } from 'react'
import { stats } from './data.js'
import { Bell, Chart, Gear, Grid, Logo, Search, Users, Wallet } from './components/Icons.jsx'
import StatCard from './components/StatCard.jsx'
import AreaChart from './components/AreaChart.jsx'
import Donut from './components/Donut.jsx'
import BarChart from './components/BarChart.jsx'
import Team from './components/Team.jsx'
import Activity from './components/Activity.jsx'

const nav = [
  { id: 'overview', label: 'Resumen', Icon: Grid },
  { id: 'analytics', label: 'Analítica', Icon: Chart },
  { id: 'team', label: 'Equipo', Icon: Users },
  { id: 'billing', label: 'Facturación', Icon: Wallet },
  { id: 'settings', label: 'Ajustes', Icon: Gear },
]

export default function App() {
  const [active, setActive] = useState('overview')

  return (
    <div className="shell">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      <aside className="glass sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Logo />
          </span>
          <span className="brand-name">
            Dashboard <em>V28</em>
          </span>
        </div>
        <nav aria-label="Principal">
          {nav.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-item ${active === id ? 'on' : ''}`}
              onClick={() => setActive(id)}
              aria-current={active === id ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Buen día, Thomas</h1>
            <p className="muted">Así va tu negocio hoy.</p>
          </div>
          <div className="top-actions">
            <label className="glass search">
              <Search />
              <input type="search" placeholder="Buscar…" aria-label="Buscar" />
            </label>
            <button className="glass icon-btn" aria-label="Notificaciones">
              <Bell />
              <i className="badge" />
            </button>
            <div className="me" aria-label="Perfil">TC</div>
          </div>
        </header>

        <section className="stats">
          {stats.map((s, i) => (
            <StatCard key={s.id} stat={s} index={i} />
          ))}
        </section>

        <section className="grid">
          <AreaChart />
          <Donut />
          <BarChart />
          <Team />
          <Activity />
        </section>
      </main>
    </div>
  )
}
