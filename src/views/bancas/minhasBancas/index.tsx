import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import BancaBar from "./bancaBar"
import { useNavigate } from "react-router-dom"
import { Banca } from "../../../@tfg/domain/entities/Banca"
import { ListarBancasQuery } from "../../../@tfg/application/ListarBancas.query"
import ModalAvaliarEntregaFinal from "./modalEntregaFinal"
import MessageSnackbar from "../../../components/MessageSnackbar"
import { AvaliarEntregaFinalTfgUsecase } from "../../../@tfg/application/AvaliarNotaFinalTfg.usecase"
import { TIPO_USUARIO } from "../../../@usuario/domain/entities/Usuario"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const listarBancas = new ListarBancasQuery(tfgGateway)
const avaliarEntregaFinal = new AvaliarEntregaFinalTfgUsecase(tfgGateway)

function ListagemBancas() {
    const [bancas, setBancas] = useState<Banca[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [bancaSelecionada, setBancaSelecionada] = useState<Banca | null>(null)

    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")

    const navigate = useNavigate()

    async function avaliar(notaApresentacao: number, notaTrabalho: number) {
        try {
            if (bancaSelecionada) {
                await avaliarEntregaFinal.execute({
                    tfgId: bancaSelecionada.getTfgId(),
                    notaApresentacao,
                    notaTrabalho,
                    tipoEntrega: "final",
                })

                setOpen(false)
                setSnackbarSeverity("success")
                setSnackbarMessage("Avaliação realizada com sucesso!")
                setShowSnackbar(true)

                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao avaliar entrega final")
            setShowSnackbar(true)
        }
    }

    useEffect(() => {
        async function getTfgs(): Promise<void> {
            try {
                const bancas = await listarBancas.execute()
                setBancas(bancas)
            } catch (e) {
                setSnackbarSeverity("error")
                setSnackbarMessage(
                    e instanceof Error ? e.message : "Erro ao buscar bancas",
                )
                setShowSnackbar(true)

                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }
        }
        getTfgs()
    }, [navigate])

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <div className="mt-3 mt-md-5">
                    {bancas.length ? (
                        <div>
                            <h2 className="text-center pt-3 pb-5">
                                {localStorage.getItem("tipo") ===
                                TIPO_USUARIO.PROFESSOR
                                    ? "Minhas bancas"
                                    : "Todas as bancas"}
                            </h2>
                            <div>
                                {bancas.map((banca, index) => (
                                    <BancaBar
                                        key={index}
                                        banca={banca}
                                        redirect={(id: string) => {
                                            navigate(`/tfgs/${id}`)
                                        }}
                                        avaliar={() => {
                                            setBancaSelecionada(banca)
                                            setOpen(true)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-center py-5">
                            Não existem bancas vinculadas a você!
                        </h3>
                    )}
                </div>
            </Container>

            <MessageSnackbar
                severity={snackbarSeverity}
                message={snackbarMessage}
                open={showSnackbar}
                handleClose={() => setShowSnackbar(false)}
            />

            <ModalAvaliarEntregaFinal
                open={open}
                onClose={() => {
                    setOpen(false)
                    setBancaSelecionada(null)
                }}
                avaliar={avaliar}
            />
        </div>
    )
}

export default ListagemBancas
