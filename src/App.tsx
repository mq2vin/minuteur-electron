//import {Timer} from "./Timer.tsx";

import {Home} from "./pages/Home.tsx";
import { HashRouter, Routes, Route } from 'react-router-dom'
import {Timer} from "./Timer.tsx";

function App() {

  return (
      <HashRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Timer/:duration" element={<Timer/>} />
          </Routes>
      </HashRouter>
  )
}

export default App
