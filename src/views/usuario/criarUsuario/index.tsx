import React, { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import "date-fns"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Select, MenuItem } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import Alert from "@mui/material/Alert"
import Link from "@mui/material/Link"
import axios from "axios"

interface Universidade {
  id: number
  nome: string
}

interface Instituto {
  id: number
  nome: string
}

interface Curso {
  id: number
  nome: string
}

enum TIPO_USUARIO {
  ALUNO = "ALUNO",
  PROFESSOR = "PROFESSOR",
}

export default function CriarUsuario() {
  const [inputValues, setInputValues] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    codigo: "",
    numero: "",
  })

  const [userTypeSelect, setUserTypeSelect] = useState<number | null>(null)
  const [universidades, setUniversidades] = useState<Universidade[]>([])
  const [universidadeSelected, setUniversidadeSelected] = useState<
    number | null
  >(null)
  const [institutos, setInstitutos] = useState<Instituto[]>([])
  const [institutoSelected, setInstitutoSelected] = useState<number | null>(
    null,
  )
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cursoSelected, setCursoSelected] = useState<number | null>(null)
  const [status, setStatus] = useState<boolean | string>(true)
  const [exibirInstituto, setExibirInstituto] = useState(false)
  const [exibirCurso, setExibirCurso] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((response) => {
        const { data } = response
        if (data.status === 200) {
          const universidadesData: Universidade[] = data.universidades.map(
            (universidade: any) => ({
              id: universidade.id,
              nome: universidade.nome,
            }),
          )
          setUniversidades(universidadesData)
        }
      })
  }, [])

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }, [])

  const handleSelectUserType = (event: any) => {
    switch (event.value) {
      case 1:
        document.getElementById("aluno_div")!.style.display = ""
        document.getElementById("professor_div")!.style.display = "none"
        break
      case 2:
        document.getElementById("professor_div")!.style.display = ""
        document.getElementById("aluno_div")!.style.display = "none"
        break
      default:
        break
    }
    setUserTypeSelect(event.value)
  }

  const handleSelectUniversity = (event: any) => {
    setUniversidadeSelected(event.value)
    setExibirInstituto(false)
    setExibirCurso(false)
    setInstitutoSelected(null)
    setCursoSelected(null)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universities/${event.value}/institutes`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((response) => {
        const { data } = response
        if (data.status === 200) {
          const institutosData: Instituto[] = data.institutos.map(
            (instituto: any) => ({
              id: instituto.id,
              nome: instituto.nome,
            }),
          )
          setInstitutos(institutosData)
          setExibirInstituto(true)
        }
      })
  }

  const handleSelectInstitute = (event: any) => {
    setExibirCurso(false)
    setCursoSelected(null)
    setInstitutoSelected(event.value)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/institute/${event.value}/courses`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((response) => {
        const { data } = response
        if (data.status === 200) {
          const cursosData: Curso[] = data.cursos.map((curso: any) => ({
            id: curso.id,
            nome: curso.nome,
          }))
          setCursos(cursosData)
          setExibirCurso(true)
        }
      })
  }

  const handleSelectCurso = (event: any) => {
    setCursoSelected(event.value)
  }

  function onSubmit() {
    if (cursoSelected !== null) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users`, {
          nome: inputValues.nome,
          telefone: inputValues.telefone,
          email: inputValues.email,
          senha: inputValues.senha,
          perfil_usuario: userTypeSelect,
          curso: cursoSelected,
          numero: inputValues.numero,
          codigo: inputValues.codigo,
        })
        .then((response) => {
          const { data } = response
          if (data.status === 200) {
            localStorage.setItem("userTccStatus", "sem_tcc")
            localStorage.setItem("accesstoken", data.accesstoken)
            localStorage.setItem("userId", data.usuario.id)
            localStorage.setItem("username", data.usuario.nome)
            localStorage.setItem("usertype", data.usuario.id_perfil_usuario)
            navigate("/")
          } else {
            setStatus(data.error)
          }
        })
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar usuário
            </Typography>
            {status !== true ? (
              <Alert className="my-2" variant="filled" severity="error">
                {status}
              </Alert>
            ) : (
              ""
            )}
            <InputLabel
              style={{ textAlign: "left" }}
              className={"mt-3"}
              id="label-tipo-usuario"
            >
              Tipo de usuário
            </InputLabel>
            <Select
              labelId="label-tipo-usuario"
              placeholder="Selecione"
              onChange={handleSelectUserType}
            >
              {Object.values(TIPO_USUARIO).map((tipoUsuario) => (
                <option key={tipoUsuario} value={tipoUsuario}>
                  {tipoUsuario}
                </option>
              ))}
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telefone"
              label="Telefone"
              name="telefone"
              autoComplete="telefone"
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              onChange={handleOnChange}
            />
            <InputLabel
              style={{ textAlign: "left" }}
              className={"mt-3"}
              id="label-universidade"
            >
              Universidade
            </InputLabel>
            <Select
              labelId="label-universidade"
              placeholder="Selecione"
              onChange={handleSelectUniversity}
            >
              {universidades.map((universidade) => (
                <MenuItem key={universidade.id} value={universidade.id}>
                  {universidade.nome}
                </MenuItem>
              ))}
            </Select>
            {exibirInstituto && (
              <>
                <InputLabel
                  style={{ textAlign: "left" }}
                  className={"mt-3"}
                  id="label-instituto"
                >
                  Instituto
                </InputLabel>
                <Select
                  labelId="label-instituto"
                  placeholder="Selecione"
                  onChange={handleSelectInstitute}
                >
                  {institutos.map((instituto) => (
                    <MenuItem key={instituto.id} value={instituto.id}>
                      {instituto.nome}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            {exibirCurso && (
              <>
                <InputLabel
                  style={{ textAlign: "left" }}
                  className={"mt-3"}
                  id="label-curso"
                >
                  Curso
                </InputLabel>
                <Select
                  labelId="label-curso"
                  placeholder="Selecione"
                  onChange={handleSelectCurso}
                >
                  {cursos.map((curso) => (
                    <MenuItem key={curso.id} value={curso.id}>
                      {curso.nome}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="codigo"
              label="Código do curso"
              name="codigo"
              autoComplete="codigo"
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="numero"
              label="Número"
              name="numero"
              autoComplete="numero"
              onChange={handleOnChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Criar usuário
            </Button>
            <div className="d-flex justify-content-between mt-2">
              <Link href="/login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
