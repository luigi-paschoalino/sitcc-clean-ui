import { Divider, TextField } from "@mui/material"
import Container from "@mui/material/Container"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BuscarUsuarioQuery } from "../../../@usuario/application/BuscarUsuario.query"
import { Usuario } from "../../../@usuario/domain/entities/Usuario"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { HttpServiceImpl } from "../../../infra/httpService"
import ProjetoList from "./projetoList"
import ModalCriarProjeto from "./modalCriarProjeto"
import { ProjetoProps } from "./projetoList/projetoCard"
import ModalExcluirProjeto from "./modalExcluirProjeto"
import { ExcluirProjetoUsecase } from "../../../@usuario/application/ExcluirProjeto.usecase"
import MessageSnackbar from "../../../components/MessageSnackbar"
import { EditarProjetoUsecase } from "../../../@usuario/application/EditarProjeto.usecase"
import { CriarProjetoUsecase } from "../../../@usuario/application/CriarProjeto.usecase"
import { EditarPerfilProfessorUsecase } from "../../../@usuario/application/EditarPerfilProfessor.usecase"

// HTTP Service
const httpService = new HttpServiceImpl()
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const buscarUsuarioQuery = new BuscarUsuarioQuery(usuarioGateway)
const criarProjetoUsecase = new CriarProjetoUsecase(usuarioGateway)
const editarProjetoUsecase = new EditarProjetoUsecase(usuarioGateway)
const excluirProjetoUsecase = new ExcluirProjetoUsecase(usuarioGateway)
const editarPerfilProfessorUsecase = new EditarPerfilProfessorUsecase(
    usuarioGateway,
)

export default function PerfilProfessor() {
    const { id } = useParams()

    const [professor, setProfessor] = useState<Usuario | null>(null)
    const [isProfessor, setIsProfessor] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editInfo, setEditInfo] = useState({
        descricao: "",
        link: "",
        areasAtuacao: "",
    })

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditInfo({ ...editInfo, [name]: value })
    }

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const handleSave = async () => {
        try {
            if (professor) {
                await editarPerfilProfessorUsecase.execute({
                    descricao: editInfo.descricao,
                    link: editInfo.link,
                    areasAtuacao: editInfo.areasAtuacao.split(","),
                })
                setSnackbarSeverity("success")
                setSnackbarMessage("Informações editadas com sucesso")
                setShowSnackbar(true)
                setIsEditMode(false)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao editar informações")
            setShowSnackbar(true)
        }
    }

    // Modal
    const [open, setOpen] = useState(false)
    const [openExcluir, setOpenExcluir] = useState(false)
    const [editing, setEditing] = useState(false)
    const [selectedProjeto, setSelectedProjeto] = useState<ProjetoProps | null>(
        null,
    )

    // Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")
    const [snackbarMessage, setSnackbarMessage] = useState<string>("")
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

    function handleEditar(projeto: ProjetoProps) {
        setEditing(true)
        setSelectedProjeto(projeto)
        setOpen(true)
    }

    function handleExcluir(id: string) {
        if (isProfessor && professor) {
            setSelectedProjeto(
                professor
                    .getPerfilProfessor()!
                    .projetos.find((p) => p.id === id) || null,
            )
            setOpenExcluir(true)
        }
    }

    async function editarProjeto(projeto: ProjetoProps) {
        try {
            if (selectedProjeto && isProfessor && professor) {
                await editarProjetoUsecase.execute({
                    projetoId: selectedProjeto.id,
                    titulo: projeto.titulo,
                    descricao: projeto.descricao,
                    preRequisitos: projeto.preRequisitos,
                    disponivel: projeto.disponivel,
                })
                setSnackbarSeverity("success")
                setSnackbarMessage("Projeto editado com sucesso")
                setShowSnackbar(true)
                setOpen(false)
                setSelectedProjeto(null)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao editar projeto")
            setShowSnackbar(true)
        }
    }

    async function criarProjeto(projeto: ProjetoProps) {
        try {
            await criarProjetoUsecase.execute({
                titulo: projeto.titulo,
                descricao: projeto.descricao,
                preRequisitos: projeto.preRequisitos,
            })
            setSnackbarSeverity("success")
            setSnackbarMessage("Projeto criado com sucesso")
            setShowSnackbar(true)
            setOpen(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao criar projeto")
            setShowSnackbar(true)
        }
    }

    async function excluirProjeto() {
        try {
            if (selectedProjeto && professor) {
                await excluirProjetoUsecase.execute({
                    projetoId: selectedProjeto.id,
                })
                setSnackbarSeverity("success")
                setSnackbarMessage("Projeto excluído com sucesso")
                setShowSnackbar(true)
                setOpenExcluir(false)
                setSelectedProjeto(null)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao excluir projeto")
            setShowSnackbar(true)
        }
    }

    useEffect(() => {
        async function getPerfilProfessor() {
            if (!id) return
            try {
                const professor = await buscarUsuarioQuery.execute(id)
                setProfessor(professor)
                setIsProfessor(id === localStorage.getItem("id"))

                setEditInfo({
                    areasAtuacao: professor
                        .getPerfilProfessor()!
                        .areasAtuacao.join(", "),
                    descricao: professor.getPerfilProfessor()!.descricao,
                    link: professor.getPerfilProfessor()!.link,
                })
            } catch (error) {}
        }
        getPerfilProfessor()
    }, [id])

    return (
        <div>
            <Container component="main" maxWidth="lg">
                {professor ? (
                    <>
                        <h2 className="text-center py-5">
                            <strong>{professor.getNome()}</strong>
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                id="info"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    alignItems: "center",
                                    textAlign: "left",
                                }}
                            >
                                <h3
                                    className="py-2"
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                >
                                    Informações
                                </h3>
                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    style={{
                                        margin: "0 0 20px 20px",
                                    }}
                                />
                                {isEditMode ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            width: "90%",
                                        }}
                                    >
                                        {/* Campos editáveis */}
                                        <TextField
                                            label="Descrição"
                                            name="descricao"
                                            value={editInfo.descricao}
                                            onChange={handleEditChange}
                                            fullWidth
                                            style={{
                                                marginTop: "20px",
                                                marginBottom: "20px",
                                            }}
                                        />
                                        <TextField
                                            label="Link página pessoal"
                                            name="link"
                                            value={editInfo.link}
                                            onChange={handleEditChange}
                                            fullWidth
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        />
                                        <TextField
                                            label="Áreas de atuação"
                                            name="areasAtuacao"
                                            value={editInfo.areasAtuacao}
                                            onChange={handleEditChange}
                                            fullWidth
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleSave}
                                                style={{ marginBottom: "10px" }}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={toggleEditMode}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <h4 className="py-2">
                                            <strong>Nome: </strong>
                                            {professor.getNome()}
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>Matrícula: </strong>
                                            {professor.getMatricula()}
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>Email: </strong>
                                            {professor.getEmail()}
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>Telefone: </strong>
                                            {professor.getNumero()}
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>Descrição: </strong>
                                            {
                                                professor.getPerfilProfessor()!
                                                    .descricao
                                            }
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>
                                                Link página pessoal:{" "}
                                            </strong>
                                            <a
                                                href={
                                                    professor.getPerfilProfessor()!
                                                        .link
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Link
                                            </a>
                                        </h4>
                                        <h4 className="py-2">
                                            <strong>Áreas de atuação: </strong>
                                            {professor
                                                ?.getPerfilProfessor()!
                                                .areasAtuacao.join(", ")}
                                        </h4>
                                        <button
                                            onClick={toggleEditMode}
                                            className="btn btn-primary"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                )}
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div
                                id="projetos"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    alignItems: "center",
                                    textAlign: "left",
                                }}
                            >
                                <h3
                                    className="py-2"
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                >
                                    Projetos
                                </h3>
                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    style={{
                                        margin: "0 20px 20px 0",
                                    }}
                                />
                                <ProjetoList
                                    projetos={
                                        professor.getPerfilProfessor()!.projetos
                                    }
                                    openModal={
                                        isProfessor
                                            ? () => {
                                                  setOpen(true)
                                              }
                                            : undefined
                                    }
                                    editar={handleEditar}
                                    excluir={handleExcluir}
                                    isProfessor={isProfessor}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <h2 className="text-center py-5">
                        Não foi possível carregar o perfil do professor
                    </h2>
                )}

                <ModalCriarProjeto
                    show={open}
                    editing={editing}
                    handleClose={() => {
                        setOpen(false)
                        setEditing(false)
                        setSelectedProjeto(null)
                    }}
                    projeto={selectedProjeto}
                    criar={criarProjeto}
                    editar={editarProjeto}
                />

                <ModalExcluirProjeto
                    show={openExcluir}
                    handleClose={() => {
                        setOpenExcluir(false)
                        setSelectedProjeto(null)
                    }}
                    projeto={selectedProjeto}
                    excluir={excluirProjeto}
                />

                <MessageSnackbar
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    open={showSnackbar}
                    handleClose={() => setShowSnackbar(false)}
                />
            </Container>
        </div>
    )
}
