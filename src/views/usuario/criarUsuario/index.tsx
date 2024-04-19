import { MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import "date-fns"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListarCursosQuery } from "../../../@curso/application/ListarCursos.query"
import { Curso } from "../../../@curso/domain/entities/Curso"
import { CursoHttpGatewayImpl } from "../../../@curso/infra/gateways/Curso.gateway"
import { CadastrarUsuarioUsecase } from "../../../@usuario/application/CadastrarUsuario.usecase"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { HttpServiceImpl } from "../../../infra/httpService"

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
        matricula: "",
    })

    /* HTTP Service */
    const httpService = new HttpServiceImpl()
    const cursoGateway = new CursoHttpGatewayImpl(httpService)
    const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
    const cadastrarUsuarioUsecase = new CadastrarUsuarioUsecase(usuarioGateway)
    const listarCursosQuery = new ListarCursosQuery(cursoGateway)

    /* States */

    const [tipoUsuario, setTipoUsuario] = useState<string>("")
    const [cursos, setCursos] = useState<Curso[]>([])
    const [cursoAtivo, setCursoAtivo] = useState<string>("")

    const navigate = useNavigate()

    async function handleCadastro(): Promise<void> {
        try {
            if (tipoUsuario) {
                await cadastrarUsuarioUsecase.execute({
                    nome: inputValues.nome,
                    curso: cursoAtivo,
                    email: inputValues.email,
                    senha: inputValues.senha,
                    numero: inputValues.numero,
                    tipo: tipoUsuario,
                    codigo: inputValues.codigo,
                })
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            } else {
            }
        } catch (error) {}
    }

    const handleSelectUserType = (userType: string) => {
        switch (userType) {
            case TIPO_USUARIO.ALUNO:
                document.getElementById("professor_div")!.style.display = "none"
                break
            case TIPO_USUARIO.PROFESSOR:
                document.getElementById("professor_div")!.style.display = ""
                break
            default:
                break
        }
        setTipoUsuario(userType)
    }

    const handleSelectCurso = (curso: string) => {
        setCursoAtivo(curso)
    }

    useEffect(() => {
        async function listarCursos() {
            const cursos = await listarCursosQuery.execute()
            setCursos(
                // organizar em ordem alfabética
                cursos.sort((a, b) => a.getNome().localeCompare(b.getNome())),
            )
        }

        listarCursos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <div className="mt-3 mt-md-5">
                    <div className="text-center">
                        <h2 className="mb-3">Criar usuário</h2>
                        {
                            // TODO: mudar para SnackbarMessage dos components
                            /* {status !== true ? (
                            <Alert
                                className="my-2"
                                variant="filled"
                                severity="error"
                            >
                                {status}
                            </Alert>
                        ) : (
                            ""
                        )} */
                        }
                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-3"}
                            id="label-tipo-usuario"
                        >
                            Tipo de usuário
                        </InputLabel>
                        <Select
                            id="select_tipo"
                            labelId="label-tipo-usuario"
                            placeholder="Selecione"
                        >
                            {Object.values(TIPO_USUARIO).map(
                                (tipoUsuario, key) => (
                                    <MenuItem
                                        value={tipoUsuario}
                                        key={key}
                                        onClick={() =>
                                            handleSelectUserType(tipoUsuario)
                                        }
                                    >
                                        {tipoUsuario}
                                    </MenuItem>
                                ),
                            )}
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
                            onChange={(e) => {
                                setInputValues({
                                    ...inputValues,
                                    nome: e.target.value,
                                })
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="matricula"
                            label="Matrícula"
                            name="matricula"
                            onChange={(e) => {
                                setInputValues({
                                    ...inputValues,
                                    matricula: e.target.value,
                                })
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="numero"
                            label="Número de telefone"
                            name="numero"
                            onChange={(e) => {
                                setInputValues({
                                    ...inputValues,
                                    numero: e.target.value,
                                })
                            }}
                        ></TextField>
                        <div style={{ display: "none" }} id="professor_div">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="codigo"
                                label="Código"
                                name="codigo"
                                onChange={(e) => {
                                    setInputValues({
                                        ...inputValues,
                                        codigo: e.target.value,
                                    })
                                }}
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
                            onChange={(e) => {
                                setInputValues({
                                    ...inputValues,
                                    email: e.target.value,
                                })
                            }}
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
                            onChange={(e) => {
                                setInputValues({
                                    ...inputValues,
                                    senha: e.target.value,
                                })
                            }}
                        />
                        {cursos.length && (
                            <>
                                <InputLabel
                                    style={{ textAlign: "left" }}
                                    className={"mt-3"}
                                    id="label-curso"
                                >
                                    Curso
                                </InputLabel>
                                <Select
                                    id="select_curso"
                                    labelId="label-curso"
                                    placeholder="Selecione"
                                >
                                    {cursos.map((curso) => (
                                        <MenuItem
                                            key={curso.getId()}
                                            value={curso.getId()}
                                            onClick={() =>
                                                handleSelectCurso(curso.getId())
                                            }
                                        >
                                            {curso.getNome()}
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
                            className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                            onClick={handleCadastro}
                        >
                            Criar usuário
                        </Button>
                        <Link href="/login">
                            <Button
                                type="button"
                                variant="contained"
                                fullWidth
                                color="secondary"
                                size="large"
                                className="mb-3 mb-md-4 mt-2 backgroundcolor4"
                            >
                                Voltar
                            </Button>
                        </Link>
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
