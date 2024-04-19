import Container from "@mui/material/Container"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HttpServiceImpl } from "../../../infra/httpService"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { ListarProfessoresQuery } from "../../../@usuario/application/ListarProfessores.query"
import { Usuario } from "../../../@usuario/domain/entities/Usuario"
import OrientadorTable from "./orientadorBar"

// HTTP Services
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const listarProfessoresQuery = new ListarProfessoresQuery(usuarioGateway)

export default function Orientadores() {
    const [orientadores, setOrientadores] = useState<Usuario[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        async function getOrientadores() {
            const orientadores = await listarProfessoresQuery.execute()
            setOrientadores(orientadores)
        }
        getOrientadores()
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="md">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <OrientadorTable
                        orientadores={orientadores}
                        navigate={navigate}
                    />
                </div>
            </Container>
        </div>
    )
}
