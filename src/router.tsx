import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"
import CriarAtividade from "./views/atividades/criarAtividade"

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/criarAtividade" element={<CriarAtividade />} />
    </Routes>
  </BrowserRouter>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export default AppRouter
