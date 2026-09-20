// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './components/context/UserProvider.jsx'
import { ChangeProvider } from './components/context/ChangeProvider.jsx'

createRoot(document.getElementById('root')).render(
  

 <UserProvider>
  <ChangeProvider>
    <App/>

  </ChangeProvider>  
 </UserProvider>



)


