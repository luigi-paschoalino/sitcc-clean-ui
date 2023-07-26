import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import axios from "axios"

interface Matricula {
    id: string
    nome: string
}

function ConfirmarMatricula() {
    const [requisicao, setRequisicao] = useState<boolean>(false)
    const [matriculas, setMatriculas] = useState<Matricula[]>([])
    const idUsuario = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/tfg/search-users-registration/${idUsuario}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((res) => {
                if (res.data.status !== 200) {
                    setMatriculas([])
                } else {
                    setMatriculas(res.data.resultsTfg)
                }
                setRequisicao(true)
            })
    }, [])

    const rejeitar = useCallback((idTcc: string) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
                {
                    status_tfg: "matricula_recusada",
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
                    status_tfg: "matricula_aprovada",
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
                        matriculas.length > 0 ? (
                            <div>
                                <h2 className="text-center pt-3 pb-5">
                                    Matrículas
                                </h2>
                                <div>
                                    {matriculas.map((matricula) => (
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
                                                {matricula.nome}
                                            </div>
                                            <div className="mx-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        rejeitar(matricula.id)
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
                                                        aceitar(matricula.id)
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
                                Não existem matrículas a serem aceitas/recusadas
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

export default ConfirmarMatricula
