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
import { HttpServiceImpl } from "../../../infra/httpService"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { CadastrarUsuarioUsecase } from "../../../@usuario/application/CadastrarUsuario.usecase"
import { UniversidadeHttpGatewayImpl } from "../../../@universidade/infra/gateways/Universidade.gateway"
import { ListarUniversidadesQuery } from "../../../@universidade/application/ListarUniversidades.query"

export interface UniversidadeProps {
  id: string
  nome: string
  institutos: InstitutoProps[]
}
export interface InstitutoProps {
  id: string
  nome: string
  cursos: CursoProps[]
}

export interface CursoProps {
  id: string
  nome: string
  codigo: string
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

  /* HTTP Service */
  const httpService = new HttpServiceImpl()

  const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
  const cadastrarUsuarioUsecase = new CadastrarUsuarioUsecase(usuarioGateway)

  const universidadeGateway = new UniversidadeHttpGatewayImpl(httpService)
  const listarUniversidadesQuery = new ListarUniversidadesQuery(
    universidadeGateway,
  )

  /* States */

  const [tipoUsuario, setTipoUsuario] = useState<string>("")
  const [universidades, setUniversidades] = useState<UniversidadeProps[]>([])
  const [universidadeAtiva, setUniversidadeAtiva] = useState<UniversidadeProps>(
    {
      id: "",
      nome: "",
      institutos: [],
    },
  )
  const [institutos, setInstitutos] = useState<InstitutoProps[]>([])
  const [institutoAtivo, setInstitutoAtivo] = useState<InstitutoProps>({
    id: "",
    nome: "",
    cursos: [],
  })
  const [cursos, setCursos] = useState<CursoProps[]>([])
  const [cursoAtivo, setCursoAtivo] = useState<string>("")
  const [status, setStatus] = useState<boolean | string>(true)
  const [exibirInstituto, setExibirInstituto] = useState(false)
  const [exibirCurso, setExibirCurso] = useState(false)
  const navigate = useNavigate()

  /* Functions */
  useEffect(() => {
    async function getUniversidades(): Promise<void> {
      const universidadesData = await listarUniversidadesQuery.execute()
      setUniversidades(universidadesData)
    }
    getUniversidades()
    console.log(universidades)
  }, [])

  useEffect(() => {
    if (universidadeAtiva.id !== "") {
      setInstitutos(universidadeAtiva.institutos)
      setExibirInstituto(true)
    }
  }, [universidadeAtiva])

  useEffect(() => {
    if (institutoAtivo.id !== "") {
      setCursos(institutoAtivo.cursos)
      setExibirCurso(true)
    }
  }, [institutoAtivo])

  useEffect(() => {
    if (cursoAtivo !== "") {
      console.log(cursoAtivo)
    }
  }, [cursoAtivo])

  async function handleCadastro(): Promise<void> {
    try {
      console.log(tipoUsuario, cursoAtivo, inputValues)
      if (tipoUsuario) {
        await cadastrarUsuarioUsecase.execute({
          nome: inputValues.nome,
          curso: cursoAtivo,
          email: inputValues.email,
          senha: inputValues.senha,
          numero: inputValues.numero,
          tipo: tipoUsuario,
        })
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }, [])

  const handleSelectUserType = (userType: string) => {
    switch (userType) {
      case "ALUNO":
        document.getElementById("aluno_div")!.style.display = ""
        document.getElementById("professor_div")!.style.display = "none"
        break
      case "PROFESSOR":
        document.getElementById("professor_div")!.style.display = ""
        document.getElementById("aluno_div")!.style.display = "none"
        break
      default:
        break
    }
    setTipoUsuario(userType)
  }

  const handleSelectUniversity = (universidade: UniversidadeProps) => {
    setUniversidadeAtiva(universidade)
    setExibirInstituto(true)
    setExibirCurso(false)
  }

  const handleSelectInstitute = (instituto: InstitutoProps) => {
    setInstitutoAtivo(instituto)
    setExibirCurso(true)
  }

  const handleSelectCurso = (curso: string) => {
    setCursoAtivo(curso)
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
            <Select labelId="label-tipo-usuario" placeholder="Selecione">
              {Object.values(TIPO_USUARIO).map((tipoUsuario, key) => (
                <MenuItem
                  value={tipoUsuario}
                  key={key}
                  onClick={() => handleSelectUserType(tipoUsuario)}
                >
                  {tipoUsuario}
                </MenuItem>
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
            <div style={{ display: "none" }} id="professor_div">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numeroprofessor"
                label="Número"
                name="numero"
                onChange={handleOnChange}
              ></TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Código"
                name="codigo"
                onChange={handleOnChange}
              ></TextField>
            </div>
            <div style={{ display: "none" }} id="aluno_div">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numeromatricula"
                label="Número de matrícula"
                name="numero"
                onChange={handleOnChange}
              ></TextField>
            </div>
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
            <Select labelId="label-universidade" placeholder="Selecione">
              {universidades.map((universidade, key) => (
                <MenuItem
                  key={key}
                  value={universidade.id}
                  onClick={() => handleSelectUniversity(universidade)}
                >
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
                <Select labelId="label-instituto" placeholder="Selecione">
                  {institutos.map((instituto, key) => (
                    <MenuItem
                      key={key}
                      value={instituto.id}
                      onClick={() => handleSelectInstitute(instituto)}
                    >
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
                <Select labelId="label-curso" placeholder="Selecione">
                  {cursos.map((curso) => (
                    <MenuItem
                      key={curso.id}
                      value={curso.id}
                      onClick={() => handleSelectCurso(curso.id)}
                    >
                      {curso.nome}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCadastro}
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
