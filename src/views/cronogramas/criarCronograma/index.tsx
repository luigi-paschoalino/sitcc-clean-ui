import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BuscarUsuarioQuery } from "../../../@usuario/application/BuscarUsuario.query"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { HttpServiceImpl } from "../../../infra/httpService"
import { CursoHttpGatewayImpl } from "../../../@curso/infra/gateways/Curso.gateway"
import { CriarCronogramaUsecase } from "../../../@curso/application/CriarCronograma.usecase"
import MessageSnackbar from "../../../components/MessageSnackbar"

//HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const cursoGateway = new CursoHttpGatewayImpl(httpService)
const buscarUsuarioQuery = new BuscarUsuarioQuery(usuarioGateway)
const criarCronogramaUsecase = new CriarCronogramaUsecase(cursoGateway)

export default function CriarCronograma() {
    const [curso, setCurso] = useState({
        id: "",
        nome: "",
    })
    const [inputValues, setInputValues] = useState<{
        ano: number | null
        semestre: "PRIMEIRO" | "SEGUNDO" | null
    }>({
        ano: null,
        semestre: null,
    })

    // Snackbar
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")

    const navigate = useNavigate()

    async function criarCronograma() {
        try {
            if (!inputValues.ano) {
                setMessage("O ano é obrigatório")
                setSeverity("warning")
                setOpen(true)
                return
            }
            if (!inputValues.semestre) {
                setMessage("O semestre é obrigatório")
                setSeverity("warning")
                setOpen(true)
                return
            }

            await criarCronogramaUsecase.execute({
                ano: inputValues.ano,
                cursoId: curso.id,
                semestre: inputValues.semestre,
            })

            setMessage("Cronograma criado com sucesso")
            setSeverity("success")
            setOpen(true)
            setTimeout(() => {
                navigate("/cronogramas")
            }, 5000)
        } catch (error) {
            setMessage("Erro ao criar cronograma")
            setSeverity("error")
            setOpen(true)
        }
    }

    useEffect(() => {
        async function buscarUsuario() {
            const usuario = await buscarUsuarioQuery.execute(
                localStorage.getItem("id") || "",
            )
            setCurso({
                id: usuario.getCurso().id,
                nome: usuario.getCurso().nome,
            })
        }
        buscarUsuario()
    }, [])

    return (
        <Container component="main" maxWidth="sm">
            <h2 className="text-center pt-3 pb-5">Criar cronograma</h2>
            <FormControl fullWidth variant="outlined" margin="normal">
                <TextField
                    required
                    disabled
                    id="curso"
                    label="Curso"
                    name="curso"
                    value={curso.nome}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
                <TextField
                    required
                    id="ano"
                    label="Ano"
                    name="ano"
                    type="number"
                    onChange={(e) =>
                        setInputValues({
                            ...inputValues,
                            ano: Number(e.target.value),
                        })
                    }
                />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                        textAlign: "start",
                        marginTop: "1rem",
                    }}
                >
                    Semestre
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(e) =>
                        setInputValues({
                            ...inputValues,
                            semestre: e.target.value as "PRIMEIRO" | "SEGUNDO",
                        })
                    }
                >
                    <FormControlLabel
                        value="PRIMEIRO"
                        control={<Radio />}
                        label="Primeiro"
                    />
                    <FormControlLabel
                        value="SEGUNDO"
                        control={<Radio />}
                        label="Segundo"
                    />
                </RadioGroup>
            </FormControl>
            <Button
                type="button"
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                className="mb-3 mb-md-4 mt-4"
                onClick={criarCronograma}
            >
                Cadastrar
            </Button>

            <MessageSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message={message}
                severity={severity}
            />
        </Container>
    )
}
