import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './utils/DataContext.jsx'
import { AttendanceProvider } from './utils/AttendanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <DataProvider>
      <AttendanceProvider>
    <App />
    </AttendanceProvider>
    </DataProvider>
  
  </StrictMode>,
)
