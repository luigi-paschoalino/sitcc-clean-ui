import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Switch from "@mui/material/Switch"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import { Select, MenuItem } from "@mui/material"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TccHttpGatewayImpl } from "../../../@tfg/infra/Tcc.gateway"
import { CadastrarTccUsecase } from "../../../@tfg/application/CadastrarTcc.usecase"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { ListarProfessoresQuery } from "../../../@usuario/application/ListarProfessores.query"
import { Professor } from "../../../@usuario/domain/gateways/Usuario.gateway"

//HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const listarProfessores = new ListarProfessoresQuery(usuarioGateway)
const tccGateway = new TccHttpGatewayImpl(httpService)
const cadastrarTccUsecase = new CadastrarTccUsecase(tccGateway)

export default function MatriculaTfg() {
    const [orientador, setOrientadores] = useState<Professor[]>([])
    const [orientadorAtivo, setOrientadorAtivo] = useState<Professor>({
        id: "",
        nome: "",
    })
    const [coorientador, setCoorientadores] = useState<Professor[]>([])
    const [coorientadorAtivo, setCoorientadorAtivo] = useState<Professor>({
        id: "",
        nome: "",
    })
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function getProfessores(): Promise<void> {
            const listaProfessores = await listarProfessores.execute()
            setOrientadores(listaProfessores.slice())
        }
        getProfessores()
    }, [])

    const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    const handleChangeOrientador = (professor: Professor) => {
        setOrientadorAtivo(professor)
    }

    const handleChangeCoorientador = (professor: Professor) => {
        setCoorientadorAtivo(professor)
    }

    useEffect(() => {
        const professoresFiltrados = orientador.filter(
            (professor) => professor !== orientadorAtivo,
        )
        setCoorientadores(professoresFiltrados)
    }, [orientadorAtivo])

    async function onSubmit() {
        if (!checked) {
            console.log("entro")
            coorientadorAtivo.id = ""
        }
        console.log(coorientadorAtivo.id)
        await cadastrarTccUsecase.execute({
            orientador: orientadorAtivo.id,
            coorientador: coorientadorAtivo.id,
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <Typography
                        className="pb-5 pt-2"
                        component="h1"
                        variant="h4"
                    >
                        Registrar Matrícula
                    </Typography>
                    <div className="imc_div">
                        <InputLabel>
                            Selecione o Professor Orientador
                        </InputLabel>
                        <Select
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Professor Orientador"
                        >
                            {orientador.map((professor) => (
                                <MenuItem
                                    value={professor.nome}
                                    onClick={() =>
                                        handleChangeOrientador(professor)
                                    }
                                >
                                    {professor.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div
                        className={"mt-3"}
                        style={{
                            display: "flex",
                            justifyItems: "center",
                            alignItems: "center",
                        }}
                    >
                        <InputLabel
                            style={{ textAlign: "center" }}
                            className={"mt-2"}
                            id="label-professor-imc"
                        >
                            Possui coorientador?
                        </InputLabel>
                        <Switch checked={checked} onChange={switchHandler} />
                    </div>

                    {checked === true ? (
                        <div className="imc_div">
                            <Select
                                className={"mt-3"}
                                labelId="label-tipo-usuario"
                                placeholder="Professor Coorientador"
                            >
                                {coorientador.map((professor) => (
                                    <MenuItem
                                        value={professor.nome}
                                        onClick={() =>
                                            handleChangeCoorientador(professor)
                                        }
                                    >
                                        {professor.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
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
