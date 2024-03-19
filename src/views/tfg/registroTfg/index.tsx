import React, { useState, useCallback, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import axios from "axios"

interface InputValues {
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    metodoPesquisa: string
    tecnicaPesquisa: string
    descricaoMetodologia: string
    resultadosEsperados: string
}

export default function RegistroTfg() {
    const [inputValues, setInputValues] = useState<InputValues>({
        titulo: "",
        palavrasChave: "",
        introducao: "",
        objetivos: "",
        bibliografia: "",
        metodoPesquisa: "",
        tecnicaPesquisa: "",
        descricaoMetodologia: "",
        resultadosEsperados: "",
    })

    const idTcc = localStorage.getItem("userTccId")
    const navigate = useNavigate()
    var [status, setStatus] = useState<boolean>(true)

    const handleOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [name]: value,
            }))
        },
        [],
    )

    // TODO: enviar via UseCase
    function onSubmit() {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/tfg/${idTcc}`,
                {
                    titulo: inputValues.titulo,
                    palavras_chave: inputValues.palavrasChave,
                    introducao: inputValues.introducao,
                    objetivos: inputValues.objetivos,
                    bibliografia: inputValues.bibliografia,
                    metodologia: inputValues.descricaoMetodologia,
                    resultados: inputValues.resultadosEsperados,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((response) => {
                if (response.data.status === 200) {
                    axios
                        .put(
                            `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
                            {
                                status_tfg: "registro_de_projeto_realizado",
                            },
                            {
                                headers: {
                                    Authorization:
                                        localStorage.getItem("authToken"),
                                },
                            },
                        )
                        .then((response) => {
                            localStorage.setItem(
                                "userTccStatus",
                                "registro_de_projeto_realizado",
                            )
                            return navigate("/")
                        })
                } else {
                    setStatus(response.data.error)
                }
            })
    }

    return (
        <Container component="main" maxWidth="sm">
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <Typography
                        className="pb-5 pt-2"
                        component="h1"
                        variant="h4"
                    >
                        Registrar Projeto
                    </Typography>
                </div>
                {status !== true ? (
                    <Alert
                        className="mt-2 mb-4"
                        variant="filled"
                        severity="error"
                    >
                        {status}
                    </Alert>
                ) : (
                    ""
                )}
                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-titulo"
                >
                    Título
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="titulo"
                    name="titulo"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-palavras"
                >
                    Palavras-chave
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="palavras_chave"
                    name="palavrasChave"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-introducao"
                >
                    Introdução/Justificativa/Relevância
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="introducao"
                    name="introducao"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-objetivos"
                >
                    Objetivos
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="objetivos"
                    name="objetivos"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-bibliografia"
                >
                    Bibliografia básica
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="bibliografia"
                    name="bibliografia"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-metodologia"
                >
                    Metodologia
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="metodologia"
                    name="metodologia"
                    onChange={handleOnChange}
                ></TextField>

                <InputLabel
                    style={{ textAlign: "left" }}
                    className={"mt-2 mb-0"}
                    id="label-resultados"
                >
                    Resultados esperados
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="resultados"
                    name="resultados"
                    onChange={handleOnChange}
                ></TextField>

                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                    onClick={() => onSubmit()}
                >
                    Registrar
                </Button>
            </div>
        </Container>
    )
}
