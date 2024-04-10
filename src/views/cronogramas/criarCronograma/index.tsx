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

//HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const buscarUsuarioQuery = new BuscarUsuarioQuery(usuarioGateway)

export default function CriarCronograma() {
    const [curso, setCurso] = useState({
        id: "",
        nome: "",
    })
    const [inputValues, setInputValues] = useState<{
        ano: number
        semestre: "1" | "2"
    }>({
        ano: new Date().getFullYear(),
        semestre: "1",
    })

    const navigate = useNavigate()

    useEffect(() => {
        async function buscarUsuario() {
            const usuario = await buscarUsuarioQuery.execute(
                localStorage.getItem("id") || "",
            )
            console.log(usuario)
            setCurso({
                id: usuario.getCurso().id,
                nome: usuario.getCurso().nome,
            })
        }
        buscarUsuario()
    }, [])

    useEffect(() => {
        console.log(inputValues)
    }, [inputValues])

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
                            semestre: e.target.value as "1" | "2",
                        })
                    }
                >
                    <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Primeiro"
                    />
                    <FormControlLabel
                        value="2"
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
                // seu onClick aqui
            >
                Cadastrar
            </Button>
        </Container>
    )
}
