import Container from "@mui/material/Container"
import { HttpServiceImpl } from "../../../infra/httpService"
import { CursoHttpGatewayImpl } from "../../../@curso/infra/gateways/Curso.gateway"
import { BuscarCronogramaVigenteQuery } from "../../../@curso/application/BuscarCronogramaVigente.query"
import { Cronograma } from "../../../@curso/domain/entities/Cronograma"
import { useEffect, useState } from "react"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { BuscarUsuarioQuery } from "../../../@usuario/application/BuscarUsuario.query"
import { useNavigate } from "react-router-dom"
import CronogramaBar from "./cronogramaBar"
import ModalEditarCronograma from "./modalEditarCronograma"
import MessageSnackbar from "../../../components/MessageSnackbar"

// HTTP Service
const httpService = new HttpServiceImpl()
const cursoGateway = new CursoHttpGatewayImpl(httpService)
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const buscarCronogramaVigenteQuery = new BuscarCronogramaVigenteQuery(
    cursoGateway,
)
const buscarUsuarioQuery = new BuscarUsuarioQuery(usuarioGateway)

export default function Cronogramas() {
    const [cronograma, setCronograma] = useState<Cronograma>()

    // Modal
    const [show, setShow] = useState(false)

    // Snackbar
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "warning" | "info"
    >("success")

    const navigate = useNavigate()

    useEffect(() => {
        const id = localStorage.getItem("id")
        async function buscarCronogramaVigente() {
            if (!id) {
                navigate("/login")
                return
            }
            const usuario = await buscarUsuarioQuery.execute(id)
            const cronograma = await buscarCronogramaVigenteQuery.execute({
                cursoId: usuario.getCurso().id,
            })
            setCronograma(cronograma)
        }

        buscarCronogramaVigente()
    }, [navigate])

    return (
        <div>
            <Container component="main" maxWidth="md">
                <div className="mt-3 mt-md-5">
                    <h2 className="text-center pt-3 pb-5">Cronogramas</h2>
                </div>
                {cronograma && cronograma.getAtividades()?.length ? (
                    <div className="row justify-content-center">
                        <CronogramaBar
                            displayAtivo={true}
                            cronograma={cronograma}
                            openModal={() => setShow(true)}
                        />
                    </div>
                ) : (
                    <h3 className="text-center py-5">
                        Não há cronogramas cadastrados!
                    </h3>
                )}
            </Container>

            <MessageSnackbar
                severity={snackbarSeverity}
                message={snackbarMessage}
                open={showSnackbar}
                handleClose={() => setShowSnackbar(false)}
            />

            {cronograma && (
                <ModalEditarCronograma
                    show={show}
                    cronograma={cronograma}
                    handleClose={() => setShow(false)}
                />
            )}
        </div>
    )
}
