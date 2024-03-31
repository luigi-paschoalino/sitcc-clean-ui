import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AuthRotaUsecase } from "./@auth/application/AuthRota.usecase"
import { AuthHttpGatewayImpl } from "./@auth/infra/Auth.gateway"
import "./index.css"
import { HttpServiceImpl } from "./infra/httpService"
import CriarAtividade from "./views/atividades/criarAtividade"
import CriarBanca from "./views/bancas/criarBancas"
import CriarCurso from "./views/cursos/criarCurso"
import Inicio from "./views/inicio/inicio"
import CriarInstituto from "./views/institutos/criarInstituto"
import Login from "./views/login/login"
import Logout from "./views/login/logout"
import DetalhesTfg from "./views/tfg/detalhesTfg"
import ListagemTfgs from "./views/tfg/listarOrientacoes"
import MatriculaTfg from "./views/tfg/matriculaTfg"
import CriarUniversidade from "./views/universidades/criarUniversidade"
import CriarUsuario from "./views/usuario/criarUsuario"

const httpService = new HttpServiceImpl()
const authGateway = new AuthHttpGatewayImpl(httpService)
const authRotaUsecase = new AuthRotaUsecase(authGateway)

const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem("authToken")

        if (!token) throw false
        const auth = await authRotaUsecase.execute(token)
        if (!auth.data.auth) throw false
        localStorage.setItem("nome", auth.data.nome)
        localStorage.setItem("tipo", auth.data.tipo)
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
        <Route
            path="/"
            element={
                <PrivateRoute>
                    <Inicio />
                </PrivateRoute>
            }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
            path="/criarAtividade"
            element={
                <PrivateRoute>
                    <CriarAtividade />
                </PrivateRoute>
            }
        />
        <Route path="/cadastro" element={<CriarUsuario />} />
        <Route
            path="/criarUniversidade"
            element={
                <PrivateRoute>
                    <CriarUniversidade />
                </PrivateRoute>
            }
        />
        <Route
            path="/matricula-tfg"
            element={
                <PrivateRoute>
                    <MatriculaTfg />
                </PrivateRoute>
            }
        />
        <Route path="/tfgs">
            <Route
                index
                element={
                    <PrivateRoute>
                        <ListagemTfgs />
                    </PrivateRoute>
                }
            />
            <Route
                path=":id"
                element={
                    <PrivateRoute>
                        <DetalhesTfg />
                    </PrivateRoute>
                }
            />
        </Route>
        <Route
            path="/banca"
            element={
                <PrivateRoute>
                    <CriarBanca />
                </PrivateRoute>
            }
        />
        <Route
            path="/criarInstituto"
            element={
                <PrivateRoute>
                    <CriarInstituto />
                </PrivateRoute>
            }
        />
        <Route
            path="/criarCurso"
            element={
                <PrivateRoute>
                    <CriarCurso />
                </PrivateRoute>
            }
        />
    </Routes>
)

export default AppRouter
