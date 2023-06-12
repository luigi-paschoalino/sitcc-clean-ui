import React, { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Select, MenuItem } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import Alert from "@mui/material/Alert"
import axios from "axios"

interface ValoresEntradaUsuario {
  nome: string
  telefone: string
  email: string
  senha: string
  codigo: string
}

interface ValoresEntradaProfessor {
  email: string
}

interface OpcaoUniversidade {
  value: number
  label: string
}

interface OpcaoInstituto {
  value: number
  label: string
}

interface OpcaoCurso {
  value: number
  label: string
}

export default function CriarUsuario() {
  const [valoresEntrada, setValoresEntrada] = useState<ValoresEntradaUsuario>({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    codigo: "",
  })

  const [valoresEntradaProfessor, setValoresEntradaProfessor] =
    useState<ValoresEntradaProfessor>({
      email: "",
    })

  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<
    string | undefined
  >(undefined)

  const [status, setStatus] = useState<string | boolean>(true)
  const [universidades, setUniversidades] = useState<OpcaoUniversidade[]>([])
  const [universidadeSelecionada, setUniversidadeSelecionada] = useState<
    number[]
  >([])
  const [institutos, setInstitutos] = useState<OpcaoInstituto[]>([])
  const [institutoSelecionado, setInstitutoSelecionado] = useState<
    number[] | undefined
  >()
  const [cursos, setCursos] = useState<OpcaoCurso[]>([])
  const [cursoSelecionado, setCursoSelecionado] = useState<
    OpcaoCurso | undefined
  >(undefined)
  const [exibirInstituto, setExibirInstituto] = useState(false)
  const [exibirCurso, setExibirCurso] = useState(false)
  const [classStatus, setClassStatus] = useState("success")

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((datas) => {
        const universidadesFetched: OpcaoUniversidade[] =
          datas.data.universidades.map((data: any) => ({
            value: data.id,
            label: data.nome,
          }))

        setUniversidades(universidadesFetched)
      })
  }, [])

  const handleOnChange = useCallback(
    (event) => {
      const { name, value } = event.target
      setValoresEntrada({ ...valoresEntrada, [name]: value })
    },
    [valoresEntrada],
  )

  const handleOnChangeProfessor = useCallback(
    (event) => {
      const { name, value } = event.target
      setValoresEntradaProfessor({ ...valoresEntradaProfessor, [name]: value })
    },
    [valoresEntradaProfessor],
  )

  const handleOnChangeTipoUsuario = useCallback((selectedOption) => {
    setTipoUsuarioSelecionado(selectedOption.value)
    if (selectedOption.value === "PROFESSOR") {
      setExibirInstituto(true)
      setExibirCurso(false)
    } else if (selectedOption.value === "ALUNO") {
      setExibirInstituto(false)
      setExibirCurso(true)
    }
  }, [])

  const handleOnChangeUniversidade = useCallback((selectedOptions) => {
    const universidadesSelecionadas = selectedOptions.map(
      (selectedOption: any) => selectedOption.value,
    )
    setUniversidadeSelecionada(universidadesSelecionadas)
  }, [])

  const handleOnChangeInstituto = useCallback((selectedOptions) => {
    const institutosSelecionados = selectedOptions.map(
      (selectedOption: any) => selectedOption.value,
    )
    setInstitutoSelecionado(institutosSelecionados)
  }, [])

  const handleOnChangeCurso = useCallback((selectedOption) => {
    setCursoSelecionado(selectedOption)
  }, [])

  const handleCriarUsuario = useCallback(() => {
    if (tipoUsuarioSelecionado === "aluno") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/usuarios/alunos`,
          {
            nome: valoresEntrada.nome,
            telefone: valoresEntrada.telefone,
            email: valoresEntrada.email,
            senha: valoresEntrada.senha,
            codigo: valoresEntrada.codigo,
            universidades: universidadeSelecionada,
            curso: cursoSelecionado?.value,
          },
          {
            headers: {
              Authorization: localStorage.getItem("accesstoken"),
            },
          },
        )
        .then((response) => {
          setStatus(response.data.mensagem)
          setClassStatus("success")
          navigate("/usuarios")
        })
        .catch((error) => {
          setStatus(error.response.data.mensagem)
          setClassStatus("error")
        })
    } else if (tipoUsuarioSelecionado === "PROFESSOR") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/usuarios/professores`,
          {
            email: valoresEntradaProfessor.email,
            institutos: institutoSelecionado,
          },
          {
            headers: {
              Authorization: localStorage.getItem("accesstoken"),
            },
          },
        )
        .then((response) => {
          setStatus(response.data.mensagem)
          setClassStatus("success")
          navigate("/usuarios")
        })
        .catch((error) => {
          setStatus(error.response.data.mensagem)
          setClassStatus("error")
        })
    }
  }, [
    tipoUsuarioSelecionado,
    valoresEntrada,
    valoresEntradaProfessor,
    universidadeSelecionada,
    cursoSelecionado,
    institutoSelecionado,
    navigate,
  ])

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Criar Usuário
      </Typography>
      {status && <Alert severity="success">{status}</Alert>}
      <form>
        <TextField
          id="nome"
          name="nome"
          label="Nome"
          fullWidth
          margin="normal"
          value={valoresEntrada.nome}
          onChange={handleOnChange}
        />
        <TextField
          id="telefone"
          name="telefone"
          label="Telefone"
          fullWidth
          margin="normal"
          value={valoresEntrada.telefone}
          onChange={handleOnChange}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={valoresEntrada.email}
          onChange={handleOnChange}
        />
        <TextField
          id="senha"
          name="senha"
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={valoresEntrada.senha}
          onChange={handleOnChange}
        />
        <TextField
          id="codigo"
          name="codigo"
          label="Código"
          fullWidth
          margin="normal"
          value={valoresEntrada.codigo}
          onChange={handleOnChange}
        />
        <InputLabel>Tipo de Usuário</InputLabel>
        <Select onChange={handleOnChangeTipoUsuario}>
          <MenuItem value="ALUNO">Aluno</MenuItem>
          <MenuItem value="PROFESSOR">Professor</MenuItem>
        </Select>
        {exibirInstituto && (
          <>
            <InputLabel>Instituto</InputLabel>
            <Select multiple onChange={handleOnChangeInstituto}>
              {institutos.map((instituto) => (
                <MenuItem key={instituto.value} value={instituto.value}>
                  {instituto.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {exibirCurso && (
          <>
            <InputLabel>Universidade</InputLabel>
            <Select multiple onChange={handleOnChangeUniversidade}>
              {universidades.map((universidade) => (
                <MenuItem key={universidade.value} value={universidade.value}>
                  {universidade.label}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>Curso</InputLabel>
            <Select onChange={handleOnChangeCurso}>
              {cursos.map((curso) => (
                <MenuItem key={curso.value} value={curso.value}>
                  {curso.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCriarUsuario}
        >
          Criar
        </Button>
      </form>
    </Container>
  )
}
