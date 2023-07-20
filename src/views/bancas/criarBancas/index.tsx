import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import DatePicker from "@mui/lab/DatePicker"
import "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import { MenuItem, Select } from "@mui/material"
import axios from "axios"

interface Professor {
    id: string
    nome: string
}

interface InputValues {
    dia_horario: Date
}

export default function CriarBanca() {
    const [professores, setProfessores] = useState<Professor[]>([])
    const [professores1, setProfessores1] = useState<Professor[]>([])
    const [professores2, setProfessores2] = useState<Professor[]>([])
    const [idOrientador, setIdOrientador] = useState<number | null>(null)
    const idTcc = localStorage.getItem("userTccId")
    const [orientadorSelected, setOrientadorSelected] = useState<number | null>(
        null,
    )
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [coorientadorSelected, setCoorientadorSelected] = useState<
        number | null
    >(null)
    const [status, setStatus] = useState<boolean | string>(true)
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState<InputValues>({
        dia_horario: new Date(),
    })

    useEffect(() => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/users/type`,
                { perfil_usuario: 2 },
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken") || "",
                    },
                },
            )
            .then((profs) => {
                let arrayProfessores: Professor[] = []
                let arrayProfessores2: Professor[] = []
                profs.data.forEach((prof: Professor) => {
                    arrayProfessores.push({
                        id: prof.id,
                        nome: prof.nome,
                    })
                    arrayProfessores2.push({
                        id: prof.id,
                        nome: prof.nome,
                    })
                })
                setProfessores(arrayProfessores)
                setProfessores1(arrayProfessores)
                setProfessores2(arrayProfessores2)
            })
    }, [])

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/tfg/search-orientador-id/${idTcc}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken") || "",
                    },
                },
            )
            .then((res) => {
                setIdOrientador(res.data.resultsTfg[0].id)
            })
    }, [])

    const handleDateChange = (date: Date) => {
        setSelectedDate(date)
        setInputValues({ ...inputValues, dia_horario: date })
    }

    const handleChangeOrientador = (event: any) => {
        const filtered = professores.filter((prof) => {
            return prof.id !== event.value
        })
        setProfessores2(filtered)
        setOrientadorSelected(event.value)
    }

    const handleChangeCoorientador = (event: any) => {
        const filtered = professores.filter((prof) => {
            return prof.id !== event.value
        })
        setProfessores1(filtered)
        setCoorientadorSelected(event.value)
    }

    function onSubmit() {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/tfg/search-orientador-id/${idTcc}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken") || "",
                    },
                },
            )
            .then((res) => {
                if (res.data.status === 200) {
                    if (
                        orientadorSelected !== null &&
                        coorientadorSelected !== null
                    ) {
                        axios
                            .post(
                                `${process.env.REACT_APP_API_URL}/board`,
                                {
                                    id_usuario: idOrientador,
                                    id_tfg: idTcc,
                                    dia_horario: inputValues.dia_horario,
                                    nota_final: "",
                                    nota_apresentacao: "",
                                    nota_trabalho: "",
                                },
                                {
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("authToken") ||
                                            "",
                                    },
                                },
                            )
                            .then((response) => {
                                if (response.data.status === 200) {
                                    let idProfessor1 = orientadorSelected
                                    axios
                                        .post(
                                            `${process.env.REACT_APP_API_URL}/board`,
                                            {
                                                id_usuario: idProfessor1,
                                                id_tfg: idTcc,
                                                dia_horario:
                                                    inputValues.dia_horario,
                                                nota_final: "",
                                                nota_apresentacao: "",
                                                nota_trabalho: "",
                                            },
                                            {
                                                headers: {
                                                    Authorization:
                                                        localStorage.getItem(
                                                            "authToken",
                                                        ) || "",
                                                },
                                            },
                                        )
                                        .then((response) => {})
                                    let idProfessor2 = coorientadorSelected
                                    axios
                                        .post(
                                            `${process.env.REACT_APP_API_URL}/board`,
                                            {
                                                id_usuario: idProfessor2,
                                                id_tfg: idTcc,
                                                dia_horario:
                                                    inputValues.dia_horario,
                                                nota_final: "",
                                                nota_apresentacao: "",
                                                nota_trabalho: "",
                                            },
                                            {
                                                headers: {
                                                    Authorization:
                                                        localStorage.getItem(
                                                            "authToken",
                                                        ) || "",
                                                },
                                            },
                                        )
                                        .then((response) => {
                                            axios
                                                .put(
                                                    `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
                                                    {
                                                        status_tfg:
                                                            "banca_marcada",
                                                    },
                                                    {
                                                        headers: {
                                                            Authorization:
                                                                localStorage.getItem(
                                                                    "authToken",
                                                                ) || "",
                                                        },
                                                    },
                                                )
                                                .then((response) => {
                                                    localStorage.setItem(
                                                        "userTccStatus",
                                                        "banca_marcada",
                                                    )
                                                    return navigate("/")
                                                })
                                        })
                                } else {
                                    setStatus(response.data.error)
                                }
                            })
                    } else {
                        setStatus("Professores precisam ser selecionados")
                    }
                } else {
                    return
                }
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
                        Registrar Banca
                    </Typography>
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
                    <div className="imc_div">
                        <InputLabel>
                            Selecione os Professores que farão parte da banca
                        </InputLabel>
                        <Select
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Professor Orientador"
                            onChange={handleChangeOrientador}
                        >
                            {professores1.map((professor) => (
                                <MenuItem value={professor.id} />
                            ))}
                        </Select>
                    </div>
                    <div className="imc_div">
                        <Select
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Professor Coorientador"
                            onChange={handleChangeCoorientador}
                        >
                            {professores2.map((professor) => (
                                <MenuItem value={professor.id} />
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
                        <DatePicker
                            className="mt-2"
                            autoOk
                            required
                            fullWidth
                            variant="inline"
                            inputVariant="outlined"
                            label="Data"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
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
                    Marcar
                </Button>
            </div>
        </Container>
    )
}
