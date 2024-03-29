import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Link from "@mui/material/Link"
import axios from "axios"
import { HttpServiceImpl } from "../../../infra/httpService"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { AutenticarUsecase } from "../../../@usuario/application/Autenticar.usecase"

interface InputValues {
    email: string
    password: string
}

function Login() {
    const httpService = new HttpServiceImpl()
    const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
    const autenticarUsecase = new AutenticarUsecase(usuarioGateway)

    const [authStatus, setAuthStatus] = useState<boolean | null>(null)
    const [inputValues, setInputValues] = useState<InputValues>({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

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

    async function onSubmit() {
        try {
            const result = await autenticarUsecase.execute({
                email: inputValues.email,
                senha: inputValues.password,
            })

            if (!result.data.token) throw new Error()

            localStorage.setItem("authToken", result.data.token)
            localStorage.setItem("nome", result.data.nome)
            localStorage.setItem("tipo", result.data.tipo)

            setAuthStatus(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
        } catch (err) {
            setAuthStatus(false)
        }
    }

    const handleKeyPress = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                onSubmit()
            }
        },
        [],
    )

    return (
        <div>
            <div
                className="duascolunas fundo-login container-login"
                style={{ padding: "5%" }}
            >
                <div className="content-login">
                    <img
                        className="mb-5 pt-5"
                        style={{ width: "100%" }}
                        src={require("../../../images/logovertical.png")}
                        alt="logo"
                    />
                </div>
                <Container
                    className="content-login"
                    component="main"
                    maxWidth="xs"
                >
                    <div className="mt-3 mt-md-5">
                        <div className="text-center">
                            {authStatus === false ? (
                                <Alert
                                    className="mb-2"
                                    variant="filled"
                                    severity="error"
                                >
                                    Email e Senha não encontrados no sistema
                                </Alert>
                            ) : (
                                ""
                            )}
                            {authStatus === true ? (
                                <Alert
                                    className="mb-2"
                                    variant="filled"
                                    severity="success"
                                >
                                    Autenticação completa
                                </Alert>
                            ) : (
                                ""
                            )}
                            <Typography
                                component="h1"
                                variant="h6"
                            ></Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                            ></TextField>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Senha"
                                name="password"
                                type="password"
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                            ></TextField>
                            <Button
                                type="button"
                                variant="contained"
                                fullWidth
                                color="primary"
                                size="large"
                                className="mb-3 mb-md-4 mt-4 backgroundcolor1"
                                onClick={onSubmit}
                            >
                                Entrar
                            </Button>
                            <Link href="/cadastro">
                                <Button
                                    style={{ backgroundColor: "#FFC701" }}
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    color="secondary"
                                    size="large"
                                    className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                                >
                                    Cadastrar
                                </Button>
                            </Link>

                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    color="secondary"
                                    size="large"
                                    className="mb-3 mb-md-4 mt-5 backgroundcolor4"
                                >
                                    Voltar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Login
