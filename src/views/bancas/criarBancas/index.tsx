import { MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import "date-fns"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CadastrarBancaUseCase } from "../../../@tfg/application/CadastrarBanca.usecase"
import { ListarTfgsQuery } from "../../../@tfg/application/ListarTfgs.query"
import { Tfg } from "../../../@tfg/domain/entities/Tfg"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { ListarProfessoresQuery } from "../../../@usuario/application/ListarProfessores.query"
import { Usuario } from "../../../@usuario/domain/entities/Usuario"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import DateTimePickerComponent from "../../../components/DateTimePicker"
import MessageSnackbar from "../../../components/MessageSnackbar"
import { HttpServiceImpl } from "../../../infra/httpService"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const listarTfgsQuery = new ListarTfgsQuery(tfgGateway)
const listarProfessoresQuery = new ListarProfessoresQuery(usuarioGateway)
const cadastrarBancaUsecase = new CadastrarBancaUseCase(tfgGateway)

export default function CriarBanca() {
    const [professorList, setProfessorList] = useState<Usuario[]>([])
    const [professorBanca, setProfessorBanca] = useState<Usuario | null>(null)

    const [segundoProfessorList, setSegundoProfessorList] = useState<Usuario[]>(
        [],
    )
    const [segundoProfessorBanca, setSegundoProfessorBanca] =
        useState<Usuario | null>(null)
    const [dataDefesa, setDataDefesa] = useState<Date>(new Date())
    const [tfgs, setTfgs] = useState<Tfg[]>([])
    const [tfg, setTfg] = useState<Tfg | null>(null)

    // Snackbar
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<
        "error" | "warning" | "info" | "success"
    >("success")

    const navigate = useNavigate()

    async function cadastrarBanca() {
        try {
            if (!professorBanca || !segundoProfessorBanca || !dataDefesa)
                throw new Error()

            await cadastrarBancaUsecase.execute({
                usuarioId: localStorage.getItem("id") || "",
                tfgId: tfg?.getId() || "",
                data: dataDefesa,
                professorId: professorBanca.getId(),
                segundoProfessorId: segundoProfessorBanca.getId(),
            })
            setMessage("Banca cadastrada com sucesso")
            setSeverity("success")
            setOpen(true)
            setTimeout(() => {
                navigate("/bancas")
            }, 2000)
        } catch (e) {
            setMessage("Erro ao cadastrar banca")
            setSeverity("error")
            setOpen(true)
        }
    }

    function onSelectProfessor(professor: Usuario) {
        setProfessorBanca(professor)
        setSegundoProfessorList(
            professorList.filter((p) => p.getId() !== professor.getId()),
        )
    }

    useEffect(() => {
        async function getTfgs() {
            const tfgs = await listarTfgsQuery.execute()
            setTfgs(tfgs.filter((tfg) => !tfg.getBanca()))
        }
        getTfgs()
    }, [])

    useEffect(() => {
        async function getProfessores() {
            if (tfg) {
                const professores = await listarProfessoresQuery.execute()
                setProfessorList(
                    professores.filter(
                        (professor) =>
                            !tfg.getBanca()?.includes(professor.getId()) &&
                            !(tfg.getOrientador() === professor.getNome()) &&
                            !tfg
                                .getCoorientador()
                                ?.includes(professor.getNome()),
                    ),
                )
            }
        }
        getProfessores()
    }, [tfg])

    return (
        <Container component="main" maxWidth="xs">
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <h2 className="text-center pt-3 pb-5">Registro de banca</h2>
                    <div
                        className="imc_div"
                        style={{
                            marginBottom: "2rem",
                        }}
                    >
                        <InputLabel>Selecione o TFG</InputLabel>
                        <Select
                            size="small"
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Selecione o TFG"
                            onChange={(e) => {
                                const tfg = tfgs.find(
                                    (tfg) => tfg.getId() === e.target.value,
                                )
                                if (tfg) setTfg(tfg)
                            }}
                        >
                            {tfgs.map((tfg) => (
                                <MenuItem value={tfg.getId()}>
                                    {tfg.getTitulo()}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="imc_div">
                        <InputLabel>
                            Selecione os professores que farão parte da banca
                        </InputLabel>
                        <Select
                            size="small"
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Primeiro professor"
                            onChange={(e) => {
                                const professor = professorList.find(
                                    (professor) =>
                                        professor.getId() === e.target.value,
                                )
                                if (professor) onSelectProfessor(professor)
                            }}
                        >
                            {professorList.map((professor) => (
                                <MenuItem value={professor.getId()}>
                                    {professor.getNome()}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="imc_div">
                        <Select
                            size="small"
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Segundo professor"
                            onChange={(e) => {
                                const professor = professorList.find(
                                    (professor) =>
                                        professor.getId() === e.target.value,
                                )
                                setSegundoProfessorBanca(professor || null)
                            }}
                        >
                            {segundoProfessorList.map((professor) => (
                                <MenuItem value={professor.getId()}>
                                    {professor.getNome()}
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
                        <div
                            className="imc_div"
                            style={{ width: "100%", marginTop: "2rem" }}
                        >
                            <DateTimePickerComponent
                                selectedDate={dataDefesa}
                                handleDateChange={(e) => {
                                    if (e instanceof Date) setDataDefesa(e)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                    onClick={cadastrarBanca}
                    disabled={
                        !professorBanca ||
                        !segundoProfessorBanca ||
                        !tfg ||
                        !dataDefesa
                    }
                >
                    Registrar
                </Button>
            </div>

            <MessageSnackbar
                handleClose={() => setOpen(false)}
                message={message}
                severity={severity}
                open={open}
            />
        </Container>
    )
}
