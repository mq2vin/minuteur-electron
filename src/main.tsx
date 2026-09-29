import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//import TitleBar from './TitleBar.tsx'
import {Window} from "./Window.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Window name={"Miniteur"}>
          <App/>
      </Window>
  </StrictMode>,
)
