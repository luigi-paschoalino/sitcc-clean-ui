import React, { useState, useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import axios from "axios"

interface Usuario {
  nome: string
  numero: string
  telefone: string
  email: string
  id_curso: string
  aniversario: Date
}

export default function EditarUsuario() {
  const userId = localStorage.getItem("userId")
  const userType = localStorage.getItem("usertype")
  const [usuario, setUsuario] = useState<Usuario | false>(false)
  const [valoresInput, setValoresInput] = useState<Usuario>({
    nome: "",
    telefone: "",
    numero: "",
    email: "",
    id_curso: "",
    aniversario: new Date(),
  })
  const [classStatus, setClassStatus] = useState<string>("")
  const [status, setStatus] = useState<string | boolean>(true)

  useEffect(() => {
    axios
      .get<Usuario>(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((resUsuario) => {
        resUsuario.data.aniversario = new Date(resUsuario.data.aniversario)
        setValoresInput({
          nome: resUsuario.data.nome,
          numero: resUsuario.data.numero,
          telefone: resUsuario.data.telefone,
          email: resUsuario.data.email,
          id_curso: resUsuario.data.id_curso,
          aniversario: resUsuario.data.aniversario,
        })
        setUsuario(resUsuario.data)
      })
  }, [])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValoresInput({ ...valoresInput, [name]: value })
    },
    [valoresInput],
  )

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          nome: valoresInput.nome,
          telefone: valoresInput.telefone,
          numero: valoresInput.numero,
          email: valoresInput.email,
          perfil_usuario: userType,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        if (res.data.status === 200) {
          setStatus(res.data.message)
          setClassStatus("success")
          setTimeout(() => {
            setStatus(true)
          }, 5000)
        } else {
          setStatus(res.data.error)
          setClassStatus("error")
          setTimeout(() => {
            setStatus(true)
          }, 5000)
        }
      })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography component="h1" variant="h4">
              Editar usuário
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity="error">
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
              id="nome"
              label="Nome"
              name="nome"
              onChange={handleOnChange}
              value={usuario !== false ? valoresInput.nome : ""}
            >
              {" "}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="numero"
              label="Número"
              name="numero"
              onChange={handleOnChange}
              value={usuario !== false ? valoresInput.numero : ""}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telefone"
              label="Telefone"
              name="telefone"
              onChange={handleOnChange}
              value={usuario !== false ? valoresInput.telefone : ""}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              type="email"
              onChange={handleOnChange}
              value={usuario !== false ? valoresInput.email : ""}
            ></TextField>
            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4"
              onClick={() => onSubmit()}
            >
              Editar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
