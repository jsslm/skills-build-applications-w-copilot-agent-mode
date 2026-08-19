import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource('activities', controller.signal).then(setActivities).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Registro pessoal</span><h2>Atividades</h2></div><span className="data-badge">{activities.length} sessões</span></div>{state === 'loading' && <div className="loading-row">Carregando atividades...</div>}{state === 'error' && <div className="alert alert-danger">{error}</div>}{state === 'ready' && <div className="activity-list">{activities.length ? activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-icon">{activity.type?.slice(0, 1) || 'A'}</div><div><strong>{activity.type}</strong><small>{activity.durationMinutes} minutos de treino</small></div><b>+{activity.points} pts</b></article>) : <div className="empty-state">Nenhuma atividade encontrada.</div>}</div>}</section>
}
export default Activities
