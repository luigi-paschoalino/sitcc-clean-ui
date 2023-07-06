import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Link from "@mui/material/Link"
import axios from "axios"

interface PerfilProfessor {
    usuario: {
        nome: string
        numero: string
        email: string
        telefone: string
    }
    descricao: string
    areas_atuacao: string
    link: string
}

function MeuPerfilProfessor() {
    const navigate = useNavigate()
    const [perfilProfessor, setPerfilProfessor] = useState<
        PerfilProfessor | undefined
    >()
    const [requisition, setRequisition] = useState(false)

    const userId = localStorage.getItem("userId")
    var professorId = ""

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/professor/${userId}/user`, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
            .then((res) => {
                if (res.data.status === 201) {
                    return navigate("/criar-perfil-professor")
                } else {
                    professorId = res.data.perfilProfessor.id
                    axios
                        .get(
                            `${process.env.REACT_APP_API_URL}/professor/${professorId}`,
                            {
                                headers: {
                                    Authorization:
                                        localStorage.getItem("authToken"),
                                },
                            },
                        )
                        .then((res) => {
                            if (res.data.status === 200) {
                                setPerfilProfessor(res.data.perfilProfessor)
                                setRequisition(true)
                            }
                        })
                }
            })
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="md">
                {requisition === true ? (
                    <div>
                        <h1 className="text-center py-5">
                            <strong>{perfilProfessor?.usuario.nome}</strong>
                        </h1>
                        <h4 className="py-2">
                            <strong>Número: </strong>
                            {perfilProfessor?.usuario.numero}
                        </h4>
                        <h4 className="py-2">
                            <strong>Email: </strong>
                            {perfilProfessor?.usuario.email}
                        </h4>
                        <h4 className="py-2">
                            <strong>Telefone: </strong>
                            {perfilProfessor?.usuario.telefone}
                        </h4>
                        <h4 className="py-2">
                            <strong>Descrição: </strong>
                            {perfilProfessor?.descricao}
                        </h4>
                        <h4 className="py-2">
                            <strong>Áreas de Atuação:</strong>
                            {perfilProfessor?.areas_atuacao}
                        </h4>
                        <h4 className="py-2">
                            <strong>Link página pessoal: </strong>
                            <a
                                href={perfilProfessor?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Link
                            </a>
                        </h4>
                    </div>
                ) : (
                    ""
                )}
            </Container>
        </div>
    )
}

export default MeuPerfilProfessor
