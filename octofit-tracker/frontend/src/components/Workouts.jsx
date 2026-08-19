import { useEffect, useState } from 'react'
import { apiBaseUrl, getItems } from '../api'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
const workoutsEndpoint = `${apiBaseUrl}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetch(workoutsEndpoint, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error('Não foi possível carregar workouts.'); return response.json() }).then((payload) => getItems(payload)).then(setWorkouts).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Plano recomendado</span><h2>Treinos</h2></div><span className="data-badge">{workouts.length} opções</span></div>{state === 'loading' && <div className="loading-row">Carregando treinos...</div>}{state === 'error' && <div className="alert alert-danger">{error}</div>}{state === 'ready' && <div className="card-grid">{workouts.length ? workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-top"><span>{workout.category}</span><span>{workout.level}</span></div><h3>{workout.name}</h3><footer>{workout.durationMinutes} min <span>Começar treino →</span></footer></article>) : <div className="empty-state">Nenhum treino encontrado.</div>}</div>}</section>
}
export default Workouts
