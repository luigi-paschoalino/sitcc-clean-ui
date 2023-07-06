import React from "react"
import "./App.css"
import AppRouter from "./router"
import "./_styles.scss"
import { Nav } from "react-bootstrap"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
