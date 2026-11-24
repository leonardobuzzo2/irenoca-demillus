import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import Legal from './components/Legal'

const caminho = window.location.pathname.replace(/\/+$/, '')

const Pagina = () => {
  if (caminho === '/termos-de-uso') return <Legal tipo="termos" />
  if (caminho === '/politica-de-privacidade') return <Legal tipo="privacidade" />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pagina />
    <Analytics />
  </StrictMode>,
)
