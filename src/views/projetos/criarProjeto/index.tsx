import React, { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Switch from "@mui/material/Switch"
import InputLabel from "@mui/material/InputLabel"
import axios from "axios"

interface ProfileProfessor {
    id: string
}

function CriarProjeto() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const [status, setStatus] = useState(true)
    const [checked, setChecked] = useState(true)
    const [inputValues, setInputValues] = useState({
        titulo: "",
        descricao: "",
        disponivel: "",
        pre_requisito: "",
    })
    const [professorId, setProfessorId] = useState<ProfileProfessor | null>(
        null,
    )

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/professor/${userId}/user`, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
            .then((res) => {
                if (res.data.status === 201) {
                    return navigate("/")
                } else {
                    setProfessorId(res.data.perfilProfessor)
                }
            })
    }, [])

    const handleOnChange = useCallback(
        (event) => {
            const { name, value } = event.target
            setInputValues({ ...inputValues, [name]: value })
        },
        [inputValues],
    )

    const switchHandler = (event) => {
        setChecked(event.target.checked)
    }

    function onSubmit() {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/project`,
                {
                    titulo: inputValues.titulo,
                    descricao: inputValues.descricao,
                    disponivel: checked,
                    pre_requisito: inputValues.descricao,
                    id_perfil_professor: professorId?.id,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((res) => {
                if (res.data.status === 200) {
                    return navigate("/projetos")
                } else {
                    console.log(res.data)
                    setStatus(res.data.error)
                }
            })
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <div className="mt-3 mt-md-5">
                    <div className="text-center">
                        <Typography
                            className="pb-5 pt-2"
                            component="h1"
                            variant="h4"
                        >
                            Criar projeto
                        </Typography>
                        {status !== true ? (
                            <Alert
                                className="my-2"
                                variant="filled"
                                severity="error"
                            >
                                {status}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="titulo"
                            label="Título"
                            name="titulo"
                            onChange={handleOnChange}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="descricao"
                            label="Descrição"
                            name="descricao"
                            onChange={handleOnChange}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="pre_requisito"
                            label="Pre Requisito"
                            name="pre_requisito"
                            onChange={handleOnChange}
                        ></TextField>
                        <div
                            className={"mt-3"}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <InputLabel
                                style={{ textAlign: "center" }}
                                className={"mt-2"}
                                id="disponivel"
                            >
                                Disponível
                            </InputLabel>
                            <Switch
                                about="disponivel"
                                checked={checked}
                                onChange={switchHandler}
                            />
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
                            Cadastrar
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CriarProjeto
