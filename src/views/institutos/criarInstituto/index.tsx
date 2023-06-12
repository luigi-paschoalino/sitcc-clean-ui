import React, { useState, useEffect, useCallback } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Select, MenuItem } from "@mui/material"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import InputLabel from "@mui/material/InputLabel"
import axios from "axios"

interface Universidade {
  id: string
  nome: string
}

interface ValoresInput {
  nome: string
}

export default function CriarInstituto() {
  const [universidades, setUniversidades] = useState<Universidade[]>([])
  const [requisicao, setRequisicao] = useState(false)
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const [universidadeSelecionada, setUniversidadeSelecionada] = useState<
    string | null
  >(null)
  const [status, setStatus] = useState<boolean>(true)
  const [valoresInput, setValoresInput] = useState<ValoresInput>({
    nome: "",
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((unis) => {
        let arrayUniversidades: Universidade[] = []
        unis.data.universidades.forEach((uni: any) => {
          arrayUniversidades.push({
            id: uni.id,
            nome: uni.nome,
          })
        })
        setUniversidades(arrayUniversidades)
        setRequisicao(true)
        console.log(arrayUniversidades)
      })
  }, [])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValoresInput({ ...valoresInput, [name]: value })
    },
    [valoresInput],
  )

  const handleChangeUniversidades = (event: any) => {
    setUniversidadeSelecionada(event.value)
  }

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/institute`,
        {
          nome: valoresInput.nome,
          id_universidade: universidadeSelecionada,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/institutos")
        } else {
          setStatus(res.data.error)
        }
      })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar Instituto
            </Typography>
            {!status ? (
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
            ></TextField>
            <div
              className={"mt-3"}
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            ></div>
            <InputLabel
              style={{ textAlign: "center" }}
              className={"mt-2"}
              id="label-universidade"
            >
              Selecione a universidade
            </InputLabel>
            <Select
              className={"mt-3"}
              labelId="label-universidade"
              variant="outlined"
              defaultValue=""
              fullWidth
              placeholder="Universidade"
              onChange={handleChangeUniversidades}
            >
              {universidades.map((universidade) => (
                <MenuItem key={universidade.id} value={universidade.id}>
                  {universidade.nome}
                </MenuItem>
              ))}
            </Select>
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
