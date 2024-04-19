import React from "react"
import "./App.css"
import AppRouter from "./router"
import "./_styles.scss"
import Navbar from "./components/Navbar"
import { BrowserRouter } from "react-router-dom"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </div>
    )
}

export default App
