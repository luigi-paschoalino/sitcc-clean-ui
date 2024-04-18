import { Button, Container, InputLabel, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AlterarSenhaUsecase } from "../../../@usuario/application/AlterarSenha.usecase"
import { BuscarUsuarioPorHashQuery } from "../../../@usuario/application/BuscarUsuarioPorHash.query"
import { Usuario } from "../../../@usuario/domain/entities/Usuario"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { HttpServiceImpl } from "../../../infra/httpService"
import MessageSnackbar from "../../../components/MessageSnackbar"

// HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const alterarSenhaUsecase = new AlterarSenhaUsecase(usuarioGateway)
const buscarUsuarioPorHashQuery = new BuscarUsuarioPorHashQuery(usuarioGateway)

export default function AlteracaoSenha() {
    const { hash } = useParams()
    const [senha, setSenha] = useState<string>("")
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    // Snackbar
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [severity, setSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")

    useEffect(() => {
        async function getUsuario() {
            if (!hash?.trim()) return
            const usuario = await buscarUsuarioPorHashQuery.execute(hash)
            setUsuario(usuario)
        }
        getUsuario()
    }, [hash])

    async function alterarSenha() {
        try {
            if (!hash?.trim() || !usuario) return
            await alterarSenhaUsecase.execute({
                id: usuario.getId(),
                senha,
                confirmarSenha,
                hashRecuperacaoSenha: hash,
            })
            setOpen(true)
            setMessage("Senha alterada com sucesso")
            setSeverity("success")
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000)
        } catch (error) {
            setOpen(true)
            setMessage("Erro ao alterar a senha. Tente novamente.")
            setSeverity("error")
        }
    }

    return (
        <Container component="main" maxWidth="md" style={{ width: "60%" }}>
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <InputLabel
                        style={{ textAlign: "left" }}
                        className={"mt-2 mb-0"}
                        id="label-senha"
                    >
                        Senha
                    </InputLabel>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="senha"
                        name="senha"
                        onChange={(e) => {
                            setSenha(e.target.value)
                        }}
                    />

                    <InputLabel
                        style={{ textAlign: "left" }}
                        className={"mt-2 mb-0"}
                        id="label-introducao"
                    >
                        Confirmar senha
                    </InputLabel>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="password"
                        fullWidth
                        id="confirmarSenha"
                        name="confirmarSenha"
                        onChange={(e) => {
                            setConfirmarSenha(e.target.value)
                        }}
                    />
                </div>
            </div>
            <Button
                id="button"
                type="button"
                variant="contained"
                color="primary"
                size="large"
                className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                onClick={alterarSenha}
                disabled={
                    !senha.trim() ||
                    !confirmarSenha.trim() ||
                    senha !== confirmarSenha ||
                    !usuario
                }
            >
                Salvar
            </Button>

            <MessageSnackbar
                handleClose={() => setOpen(false)}
                open={open}
                message={message}
                severity={severity}
            />
        </Container>
    )
}
