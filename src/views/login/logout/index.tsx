// Neste arquivo é definido a função de logout do sistema
import { useNavigate } from "react-router-dom"
import React from "react"

function Logout() {
    const navigate = useNavigate()
    React.useEffect(() => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("nome")
        localStorage.removeItem("tipo")
        return navigate("/")
    }, [])
    return <div></div>
}

export default Logout
