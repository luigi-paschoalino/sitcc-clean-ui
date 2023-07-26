import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import axios from "axios"

interface Registro {
    id: string
    nome: string
}

function ConfirmarProjeto() {
    const [requisicao, setRequisicao] = useState<boolean>(false)
    const [registros, setRegistros] = useState<Registro[]>([])
    const idUsuario = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/tfg/search-users-record/${idUsuario}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((res) => {
                if (res.data.status !== 200) {
                    setRegistros([])
                } else {
                    setRegistros(res.data.resultsTfg)
                }
                setRequisicao(true)
            })
    }, [])

    const rejeitar = useCallback((idTcc: string) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
                {
                    status_tfg: "registro_de_projeto_reprovado",
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((response) => {
                window.location.reload()
            })
    }, [])

    const aceitar = useCallback((idTcc: string) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
                {
                    status_tfg: "registro_de_projeto_aprovado",
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((response) => {
                window.location.reload()
            })
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <div className="mt-3 mt-md-5">
                    {requisicao === true ? (
                        registros.length > 0 ? (
                            <div>
                                <h2 className="text-center pt-3 pb-5">
                                    Matrículas
                                </h2>
                                <div>
                                    {registros.map((registro) => (
                                        <div className="py-1 d-flex align-items-center">
                                            <div
                                                className="col-8 py-2"
                                                style={{
                                                    backgroundColor: "white",
                                                    borderRadius: "10px",
                                                    border: "1px solid #ececec",
                                                    boxShadow:
                                                        "0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),0 2px 1px -1px rgb(0 0 0 / 12%)",
                                                }}
                                            >
                                                {registro.nome}
                                            </div>
                                            <div className="mx-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        rejeitar(registro.id)
                                                    }
                                                >
                                                    Rejeitar
                                                </button>{" "}
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() =>
                                                        aceitar(registro.id)
                                                    }
                                                >
                                                    Aprovar
                                                </button>{" "}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <h3 className="text-center py-5">
                                Não existem registros a serem aceitas/recusadas
                            </h3>
                        )
                    ) : (
                        ""
                    )}
                </div>
            </Container>
        </div>
    )
}

export default ConfirmarProjeto
