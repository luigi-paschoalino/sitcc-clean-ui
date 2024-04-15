import { Divider } from "@mui/material"
import Container from "@mui/material/Container"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BuscarUsuarioQuery } from "../../../@usuario/application/BuscarUsuario.query"
import { Usuario } from "../../../@usuario/domain/entities/Usuario"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { HttpServiceImpl } from "../../../infra/httpService"
import ProjetosCards from "./projetosCards"

// HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const buscarUsuarioQuery = new BuscarUsuarioQuery(usuarioGateway)

export default function PerfilProfessor() {
    const { id } = useParams()

    const [professor, setProfessor] = useState<Usuario | null>(null)

    useEffect(() => {
        async function getPerfilProfessor() {
            if (!id) return
            const professor = await buscarUsuarioQuery.execute(id)
            console.log(professor)
            setProfessor(professor)
        }
        getPerfilProfessor()
    }, [id])

    return (
        <div>
            <Container component="main" maxWidth="lg">
                {professor && (
                    <>
                        <h1 className="text-center py-5">
                            <strong>{professor.getNome()}</strong>
                        </h1>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                id="info"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    alignItems: "center",
                                    textAlign: "left",
                                }}
                            >
                                <h3
                                    className="py-2"
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                >
                                    Informações
                                </h3>
                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    style={{
                                        margin: "0 0 20px 20px",
                                    }}
                                />
                                <h4 className="py-2">
                                    <strong>Nome: </strong>
                                    {professor.getNome()}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Matrícula: </strong>
                                    {professor.getMatricula()}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Email: </strong>
                                    {professor.getEmail()}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Telefone: </strong>
                                    {professor.getNumero()}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Descrição: </strong>
                                    {professor.getPerfilProfessor()!.descricao}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Áreas de atuação: </strong>
                                    {professor
                                        ?.getPerfilProfessor()!
                                        .areasAtuacao.join(", ")}
                                </h4>
                                <h4 className="py-2">
                                    <strong>Link página pessoal: </strong>
                                    <a
                                        href={
                                            professor.getPerfilProfessor()!.link
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Link
                                    </a>
                                </h4>
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div
                                id="projetos"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    alignItems: "center",
                                    textAlign: "left",
                                }}
                            >
                                <h3
                                    className="py-2"
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                >
                                    Projetos
                                </h3>
                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    style={{
                                        margin: "0 20px 20px 0",
                                    }}
                                />
                                <ProjetosCards
                                    projetos={
                                        professor.getPerfilProfessor()!.projetos
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </div>
    )
}
