import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Link from "@mui/material/Link"
import { HttpServiceImpl } from "../../../infra/httpService"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { AutenticarUsecase } from "../../../@usuario/application/Autenticar.usecase"
import ModalRecuperarSenha from "./modalRecuperarSenha"
import { RecuperarSenhaUsecase } from "../../../@usuario/application/RecuperarSenha.usecase"
import MessageSnackbar from "../../../components/MessageSnackbar"

// HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const recuperarSenhaUsecase = new RecuperarSenhaUsecase(usuarioGateway)

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

    // Modal
    const [open, setOpen] = useState<boolean>(false)

    // Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [severity, setSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")

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
            localStorage.setItem("id", result.data.id)

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
            if (event.key === "Enter") onSubmit()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [inputValues.email, inputValues.password],
    )

    async function recuperar(email: string) {
        try {
            await recuperarSenhaUsecase.execute(email)
            setMessage("Email enviado com sucesso")
            setSeverity("success")
            setOpenSnackbar(true)
        } catch (error) {
            setMessage("Erro ao enviar email")
            setSeverity("error")
            setOpenSnackbar(true)
        }
    }

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

                            <Button
                                style={{ backgroundColor: "#00B0CC" }}
                                type="button"
                                variant="contained"
                                fullWidth
                                color="secondary"
                                size="large"
                                onClick={() => setOpen(true)}
                            >
                                Recuperar senha
                            </Button>

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
                    <ModalRecuperarSenha
                        open={open}
                        handleClose={() => setOpen(false)}
                        recuperar={recuperar}
                    />

                    <MessageSnackbar
                        message={message}
                        open={openSnackbar}
                        severity={severity}
                        handleClose={() => setOpenSnackbar(false)}
                    />
                </Container>
            </div>
        </div>
    )
}

export default Login
