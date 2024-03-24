import React, { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Switch from "@mui/material/Switch"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import { Select, MenuItem, TextField } from "@mui/material"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { CadastrarTfgUsecase } from "../../../@tfg/application/CadastrarTfg.usecase"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { ListarProfessoresQuery } from "../../../@usuario/application/ListarProfessores.query"
import { Professor } from "../../../@usuario/domain/gateways/Usuario.gateway"
import "./styles.scss"

//HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const listarProfessores = new ListarProfessoresQuery(usuarioGateway)
const tccGateway = new TfgHttpGatewayImpl(httpService)
const cadastrarTccUsecase = new CadastrarTfgUsecase(tccGateway)

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

// TODO: ajeitar style pra aumentar o tamanho dos campos de texto e seleção
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
    const [checked, setChecked] = useState(false)
    // const navigate = useNavigate()

    const [preenchimentoTfg, setPreenchimentoTfg] = useState<InputValues>({
        titulo: "",
        palavrasChave: "",
        introducao: "",
        objetivos: "",
        bibliografia: "",
        descricaoMetodologia: "",
        tecnicaPesquisa: "",
        metodoPesquisa: "",
        resultadosEsperados: "",
    })

    useEffect(() => {
        async function getProfessores(): Promise<void> {
            const listaProfessores = await listarProfessores.execute()
            setOrientadores(listaProfessores.slice())
        }
        getProfessores()
    }, [])

    const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) setCoorientadorAtivo({ id: "", nome: "" })
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
    }, [orientador, orientadorAtivo])

    async function onSubmit() {
        try {
            console.log(preenchimentoTfg)
            await cadastrarTccUsecase.execute({
                orientador: orientadorAtivo.id,
                coorientador: checked ? coorientadorAtivo.id : undefined,
                ...preenchimentoTfg,
            })
        } catch (error) {
            console.log(error)
        }
    }

    // TODO: adicionar textArea em alguns campos de texto
    return (
        <Container component="main" maxWidth="md" style={{ width: "60%" }}>
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <Typography
                        className="pb-5 pt-2"
                        component="h1"
                        variant="h4"
                    >
                        Registrar matrícula
                    </Typography>
                    <div className="imc_div">
                        <InputLabel>Professor orientador</InputLabel>
                        <Select
                            className="mt-3"
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
                        className="mt-3"
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
                    ) : undefined}
                </div>
                {orientadorAtivo.id ? (
                    <div className="imc_div">
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
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    titulo: e.target.value,
                                })
                            }}
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
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    palavrasChave: e.target.value,
                                })
                            }}
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
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    introducao: e.target.value,
                                })
                            }}
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
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    objetivos: e.target.value,
                                })
                            }}
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
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    bibliografia: e.target.value,
                                })
                            }}
                        ></TextField>

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-metodologia"
                        >
                            Método de pesquisa
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="metodo_pesquisa"
                            name="metodoPesquisa"
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    metodoPesquisa: e.target.value,
                                })
                            }}
                        ></TextField>

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-tecnica"
                        >
                            Técnica de pesquisa
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="tecnica_pesquisa"
                            name="tecnicaPesquisa"
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    tecnicaPesquisa: e.target.value,
                                })
                            }}
                        ></TextField>

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-metodologia"
                        >
                            Descrição da metodologia
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="descricao_metodologia"
                            name="descricaoMetodologia"
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    descricaoMetodologia: e.target.value,
                                })
                            }}
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
                            id="resultados_esperados"
                            name="resultadosEsperados"
                            onChange={(e) => {
                                setPreenchimentoTfg({
                                    ...preenchimentoTfg,
                                    resultadosEsperados: e.target.value,
                                })
                            }}
                        ></TextField>
                    </div>
                ) : undefined}
                <Button
                    id="button"
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                    onClick={() => onSubmit()}
                    disabled={
                        !(
                            orientadorAtivo.id &&
                            preenchimentoTfg.titulo &&
                            preenchimentoTfg.palavrasChave &&
                            preenchimentoTfg.introducao &&
                            preenchimentoTfg.objetivos &&
                            preenchimentoTfg.bibliografia &&
                            preenchimentoTfg.metodoPesquisa &&
                            preenchimentoTfg.tecnicaPesquisa &&
                            preenchimentoTfg.descricaoMetodologia &&
                            preenchimentoTfg.resultadosEsperados &&
                            (checked ? coorientadorAtivo.id : true)
                        )
                    }
                >
                    Registrar
                </Button>
            </div>
        </Container>
    )
}
