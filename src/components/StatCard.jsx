import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp } from './Icons.jsx'

function useCountUp(target, duration = 1100) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(target)
      return
    }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return n
}

function Sparkline({ data }) {
  const w = 120
  const h = 38
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - min) / (max - min || 1)) * (h - 8),
  ])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={d} pathLength="1" />
    </svg>
  )
}

export default function StatCard({ stat, index }) {
  const value = useCountUp(stat.value)
  const decimals = stat.decimals ?? 0
  const text = value.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  const up = stat.delta >= 0
  return (
    <article className="glass stat" style={{ '--i': index }}>
      <p className="stat-label">{stat.label}</p>
      <p className="stat-value">
        {stat.prefix}
        {text}
        {stat.suffix}
      </p>
      <div className="stat-foot">
        <span className={`delta ${up ? 'up' : 'down'}`}>
          {up ? <ArrowUp /> : <ArrowDown />}
          {Math.abs(stat.delta)}%
        </span>
        <span className="muted">vs. mes anterior</span>
      </div>
      <Sparkline data={stat.spark} />
    </article>
  )
}
