import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource('leaderboard', controller.signal).then(setEntries).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Placar semanal</span><h2>Leaderboard</h2></div><span className="data-badge">Pontuação</span></div>{state === 'loading' && <div className="loading-row">Carregando ranking...</div>}{state === 'error' && <div className="alert alert-danger">{error}</div>}{state === 'ready' && <div className="rank-list">{entries.length ? [...entries].sort((a, b) => a.rank - b.rank).map((entry) => <article className={`rank-row rank-${entry.rank}`} key={entry._id}><span className="rank-number">{String(entry.rank).padStart(2, '0')}</span><div><strong>{entry.user?.displayName || entry.user?.username || 'Atleta'}</strong><small>Performance da semana</small></div><b>{entry.points} pts</b></article>) : <div className="empty-state">Ranking ainda sem dados.</div>}</div>}</section>
}
export default Leaderboard
