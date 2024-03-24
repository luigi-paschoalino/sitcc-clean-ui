import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { ListarTfgsQuery } from "../../../@tfg/application/ListarTfgs.query"
import { Tfg } from "../../../@tfg/domain/entities/Tfg"
import OrientacaoBar from "./orientacaoBar"
import { useNavigate } from "react-router-dom"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const listarTfgsQuery = new ListarTfgsQuery(tfgGateway)

function ListarOrientacoes() {
    const [orientacoes, setOrientacoes] = useState<Tfg[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getOrientacoes(): Promise<void> {
            const orientacoes = await listarTfgsQuery.execute()
            setOrientacoes(orientacoes)
        }
        getOrientacoes()
    }, [])

    // TODO: navegar para a página de detalhes do TFG ao clicar no botão
    return (
        <div>
            <Container component="main" maxWidth="sm">
                <div className="mt-3 mt-md-5">
                    {orientacoes.length ? (
                        <div>
                            <h2 className="text-center pt-3 pb-5">
                                Orientações
                            </h2>
                            <div>
                                {orientacoes.map((orientacao, index) => (
                                    <OrientacaoBar
                                        key={index}
                                        tfg={orientacao}
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

export default ListarOrientacoes
