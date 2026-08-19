import { useEffect, useState } from 'react'
import { apiBaseUrl, getItems } from '../api'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
const usersEndpoint = `${apiBaseUrl}/api/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(usersEndpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Não foi possível carregar users.')
        return response.json()
      })
      .then((payload) => getItems(payload))
      .then(setUsers)
      .then(() => setState('ready'))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setState('error')
        }
      })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Atletas" eyebrow="Comunidade" state={state} error={error}>
    {users.map((user) => <tr key={user._id}><td><strong>{user.displayName}</strong><small>{user.username}</small></td><td>{user.email}</td><td><span className="status-dot">Ativo</span></td></tr>)}
  </ResourceTable>
}

export function ResourceTable({ title, eyebrow, state, error, children }) {
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><span className="data-badge">API ao vivo</span></div>{state === 'loading' && <div className="loading-row">Carregando dados...</div>}{state === 'error' && <div className="alert alert-danger">{error}</div>}{state === 'ready' && (children ? <div className="table-wrap"><table><thead><tr><th>Nome</th><th>Detalhes</th><th>Status</th></tr></thead><tbody>{children}</tbody></table></div> : <div className="empty-state">Nenhum registro encontrado.</div>)}</section>
}

export default Users
