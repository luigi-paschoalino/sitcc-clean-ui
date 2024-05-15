import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { ListarTfgsQuery } from "../../../@tfg/application/ListarTfgs.query"
import { Tfg } from "../../../@tfg/domain/entities/Tfg"
import OrientacaoBar from "./orientacaoBar"
import { useNavigate } from "react-router-dom"
import { TIPO_USUARIO } from "../../../@usuario/domain/entities/Usuario"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const listarTfgsQuery = new ListarTfgsQuery(tfgGateway)

function ListagemTfgs() {
    const [tfgs, setTfgs] = useState<Tfg[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getTfgs(): Promise<void> {
            const tfgs = await listarTfgsQuery.execute()
            setTfgs(tfgs)
        }
        getTfgs()
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <div className="mt-3 mt-md-5">
                    {tfgs.length ? (
                        <div>
                            <h2 className="text-center pt-3 pb-5">
                                {localStorage.getItem("tipo") ===
                                TIPO_USUARIO.ALUNO
                                    ? "Meus TFGs"
                                    : "Orientações"}
                            </h2>
                            <div>
                                {tfgs.map((tfg, index) => (
                                    <OrientacaoBar
                                        key={index}
                                        tfg={tfg}
                                        displayAtivo={
                                            localStorage.getItem("tipo") ===
                                            TIPO_USUARIO.ALUNO
                                        }
                                        redirect={(id: string) => {
                                            navigate(`/tfgs/${id}`)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-center py-5">
                            Não existem trabalhos sob sua orientação!
                        </h3>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default ListagemTfgs
