import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { apiBaseUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { to: '/', label: 'Resumo', end: true },
  { to: '/activities', label: 'Atividades' },
  { to: '/workouts', label: 'Treinos' },
  { to: '/leaderboard', label: 'Ranking' },
  { to: '/teams', label: 'Times' },
  { to: '/users', label: 'Atletas' },
]

function Overview() {
  return <section className="overview-grid"><article className="feature-panel"><span className="eyebrow">Sua próxima sessão</span><h2>Consistência vence intensidade.</h2><p>Escolha um treino curto, registre sua atividade e suba no placar da equipe.</p><NavLink className="primary-action" to="/workouts">Explorar treinos <span>→</span></NavLink></article><div className="metric-stack"><div className="metric-card"><span>Ritmo da equipe</span><strong>+18%</strong><small>vs. semana passada</small></div><div className="metric-card accent-card"><span>Meta de hoje</span><strong>30 min</strong><small>de movimento restante</small></div></div></section>
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => item.to === location.pathname)?.label || 'Resumo'
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octo<span>Fit</span></span></NavLink><nav className="main-nav" aria-label="Navegação principal">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}</nav><div className="profile-chip"><span className="avatar">AR</span><span>Alex Runner</span></div></header><main className="main-content"><div className="page-intro"><div><span className="eyebrow">OctoFit Tracker / {currentPage}</span><h1>{currentPage === 'Resumo' ? 'Treine com propósito.' : currentPage}</h1></div><span className="connection-status"><i /> API conectada</span></div><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="*" element={<Overview />} /></Routes></main><footer className="app-footer"><span>OctoFit Tracker</span><span>{apiBaseUrl}</span></footer></div>
}

export default App
