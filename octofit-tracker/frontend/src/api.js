const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchResource(resource, signal) {
  const response = await fetch(getApiUrl(resource), { signal })
  if (!response.ok) throw new Error(`Não foi possível carregar ${resource}.`)
  return getItems(await response.json())
}
