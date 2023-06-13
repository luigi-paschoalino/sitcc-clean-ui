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

  const [tipoUsuario, setTipoUsuario] = useState<TIPO_USUARIO>()
  const [universidades, setUniversidades] = useState<UniversidadeProps[]>([])
  const [universidadeAtiva, setUniversidadeAtiva] = useState<number | null>(
    null,
  )
  const [institutos, setInstitutos] = useState<InstitutoProps[]>([])
  const [institutoAtivo, setInstitutoAtivo] = useState<string | null>(null)
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
  }, [])

  async function handleCadastro(): Promise<void> {
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
  }

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }, [])

  const handleSelectUserType = (event: any) => {
    switch (event.value) {
      case TIPO_USUARIO.ALUNO:
        document.getElementById("aluno_div")!.style.display = ""
        document.getElementById("professor_div")!.style.display = "none"
        break
      case TIPO_USUARIO.PROFESSOR:
        document.getElementById("professor_div")!.style.display = ""
        document.getElementById("aluno_div")!.style.display = "none"
        break
      default:
        break
    }
    setTipoUsuario(event.value)
  }

  const handleSelectUniversity = (event: any) => {
    setUniversidadeAtiva(event.target.value)
    setExibirInstituto(true)
    setExibirCurso(false)
  }

  const handleSelectInstitute = (event: any) => {
    setInstitutoAtivo(event.target.value)
    setExibirCurso(true)
  }

  const handleSelectCurso = (event: any) => {
    setCursoAtivo(event.target.value)
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
                <MenuItem value={tipoUsuario}>{tipoUsuario}</MenuItem>
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
