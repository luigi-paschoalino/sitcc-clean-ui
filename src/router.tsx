import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"
import CriarAtividade from "./views/atividades/criarAtividade"
import CriarUsuario from "./views/usuario/criarUsuario"
import Inicio from "./views/inicio/inicio"
import CriarUniversidade from "./views/universidades/criarUniversidade"
import MatriculaTfg from "./views/tfg/matriculaTfg"
import CriarBanca from "./views/bancas/criarBancas"

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/criarAtividade" element={<CriarAtividade />} />
      <Route path="/cadastro" element={<CriarUsuario />} />
      <Route path='/criarUniversidade' element={<CriarUniversidade/>}/>
      <Route path='/tcc' element={<MatriculaTfg/>}/>
      <Route path='/banca' element={<CriarBanca/>}/>
    </Routes>
  </BrowserRouter>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export default AppRouter
