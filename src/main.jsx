import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AiChat from './components/AiChat.jsx'
import { IoMdClose } from 'react-icons/io'
import { AiFillWechat } from 'react-icons/ai'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

  </StrictMode>,
)
