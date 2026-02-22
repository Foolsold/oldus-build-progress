import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BuildPlanDashboard from './BuildPlanDashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuildPlanDashboard />
  </StrictMode>,
)
