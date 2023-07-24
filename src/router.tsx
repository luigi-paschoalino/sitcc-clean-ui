import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {
    BrowserRouter,
    Route,
    Routes,
    Router,
    Navigate,
} from "react-router-dom"
import CriarAtividade from "./views/atividades/criarAtividade"
import CriarUsuario from "./views/usuario/criarUsuario"
import Inicio from "./views/inicio/inicio"
import CriarUniversidade from "./views/universidades/criarUniversidade"
import MatriculaTfg from "./views/tfg/matriculaTfg"
import CriarBanca from "./views/bancas/criarBancas"
import CriarInstituto from "./views/institutos/criarInstituto"
import Login from "./views/login/login"
import CriarCurso from "./views/cursos/criarCurso"
import { AuthHttpGatewayImpl } from "./@auth/infra/Auth.gateway"
import { AuthRotaUsecase } from "./@auth/application/AuthRota.usecase"
import { HttpServiceImpl } from "./infra/httpService"
import { useNavigate } from "react-router-dom"
import Logout from "./views/login/logout"
import EnviarTccParcial from "./views/tfg/enviarTccParcial"

const httpService = new HttpServiceImpl()
const authGateway = new AuthHttpGatewayImpl(httpService)
const authRotaUsecase = new AuthRotaUsecase(authGateway)

const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem("authToken")

        if (!token) throw false
        const auth = await authRotaUsecase.execute(token)
        if (!auth.data.auth) throw false
        return true
    } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("nome")
        localStorage.removeItem("tipo")
        window.location.href = "/login"
        return false
    }
}

const PrivateRoute: React.FC<any> = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const [authenticated, setAuthenticated] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        ;(async () => {
            const auth = await isAuthenticated()
            setAuthenticated(auth)
            setLoading(false)

            if (!auth) {
                navigate("/login", { replace: true })
            }
        })()
    }, [navigate])

    if (loading) {
        return null // ou sua página/componente de carregamento
    }

    return <>{children}</>
}

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<PrivateRoute><Inicio /></PrivateRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/criarAtividade" element={<PrivateRoute><CriarAtividade /></PrivateRoute>} />
    <Route path="/cadastro" element={<CriarUsuario />} />
    <Route path="/criarUniversidade" element={<PrivateRoute><CriarUniversidade /></PrivateRoute>} />
    <Route path="/tcc" element={<PrivateRoute><MatriculaTfg /></PrivateRoute>} />
    <Route path="/banca" element={<PrivateRoute><CriarBanca /></PrivateRoute>} />
    <Route path="/criarInstituto" element={<PrivateRoute><CriarInstituto /></PrivateRoute>} />
    <Route path="/criarCurso" element={<PrivateRoute><CriarCurso /></PrivateRoute>} />
    <Route path="/piru" element={<EnviarTccParcial/>} />
  </Routes>
);

export default AppRouter
