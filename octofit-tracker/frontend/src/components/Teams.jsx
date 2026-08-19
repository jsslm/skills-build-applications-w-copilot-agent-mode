import { useEffect, useState } from 'react'
import { apiBaseUrl, getItems } from '../api'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
const teamsEndpoint = `${apiBaseUrl}/api/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetch(teamsEndpoint, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error('Não foi possível carregar teams.'); return response.json() }).then((payload) => getItems(payload)).then(setTeams).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Competição</span><h2>Times</h2></div><span className="data-badge">{teams.length} times</span></div>{state === 'loading' && <div className="loading-row">Carregando times...</div>}{state === 'error' && <div className="alert alert-danger">{error}</div>}{state === 'ready' && <div className="card-grid">{teams.length ? teams.map((team) => <article className="data-card" key={team._id}><span className="card-mark">OF</span><h3>{team.name}</h3><p>{team.description || 'Sem descrição cadastrada.'}</p><footer>{team.members?.length || 0} membros</footer></article>) : <div className="empty-state">Nenhum time encontrado.</div>}</div>}</section>
}
export default Teams
