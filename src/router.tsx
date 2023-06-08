import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CriarAtividade from "./views/atividades/criarAtividade"
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Routes>
                <Route path="criarAtividade" element={<CriarAtividade />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
