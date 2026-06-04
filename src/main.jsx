import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
// import './Test.css'
import App from './App.jsx'
// import App from './Test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
