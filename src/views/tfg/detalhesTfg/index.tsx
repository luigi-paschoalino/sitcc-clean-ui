import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { BuscarTfgQuery } from "../../../@tfg/application/BuscarTfg.query"
import ModalAvaliarEntrega from "./modalEntregaParcial"
import { AvaliarNotaTfgUsecase } from "../../../@tfg/application/AvaliarNotaTfg.usecase"
import MessageSnackbar from "../../../components/MessageSnackbar"
import ModalAvaliarOrientacao from "./modalAvaliarOrientacao"
import { AvaliarOrientacaoUsecase } from "../../../@tfg/application/AvaliarOrientacaoTfg.usecase"
import FileDownload from "../../../components/FileDownload"
import { BaixarTfgUsecase } from "../../../@tfg/application/BaixarTfg.usecase"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const buscarTfgQuery = new BuscarTfgQuery(tfgGateway)
const avaliarTfgUsecase = new AvaliarNotaTfgUsecase(tfgGateway)
const avaliarOrientacaoUsecase = new AvaliarOrientacaoUsecase(tfgGateway)
const baixarTfgUsecase = new BaixarTfgUsecase(tfgGateway)

function DetalhesTfg() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")
    const [snackbarMessage, setSnackbarMessage] = useState<string>("")
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

    // Dados TFG
    const [preenchimentoTfg, setPreenchimentoTfg] = useState({
        id: "",
        aluno: "",
        orientador: "",
        titulo: "",
        palavrasChave: "",
        introducao: "",
        objetivos: "",
        bibliografia: "",
        metodoPesquisa: "",
        tecnicaPesquisa: "",
        descricaoMetodologia: "",
        resultadosEsperados: "",
        status: "",
        coorientador: "",
    })

    const handleCloseModal = () => {
        setShowModalNota(false)
        setShowModalOrientacao(false)
    }

    // Modal nota
    const [showModalNota, setShowModalNota] = useState(false)
    const handleShowModalNota = () => setShowModalNota(true)

    // Modal orientação
    const [showModalOrientacao, setShowModalOrientacao] = useState(false)
    const handheShowModalOrientacao = () => setShowModalOrientacao(true)

    function modalAvaliar(tipoModal: "NOTA" | "ORIENTACAO") {
        tipoModal === "NOTA"
            ? handleShowModalNota()
            : handheShowModalOrientacao()
    }

    function displayAvaliarButton() {
        return (
            localStorage.getItem("tipo") === "PROFESSOR" &&
            localStorage.getItem("nome") === preenchimentoTfg.orientador &&
            ![
                "ORIENTACAO_ACEITA",
                "ORIENTACAO_RECUSADA",
                "ENTREGA_PARCIAL_APROVADA",
                "APROVADO",
                "REPROVADO",
            ].includes(preenchimentoTfg.status)
        )
    }

    async function avaliarNota(nota: number) {
        try {
            await avaliarTfgUsecase.execute({
                tfgId: id ?? "",
                nota,
                tipoEntrega:
                    preenchimentoTfg.status === "ENTREGA_FINAL"
                        ? "FINAL"
                        : "PARCIAL",
            })
            handleCloseModal()
            setSnackbarSeverity("success")
            setSnackbarMessage("TFG avaliado com sucesso")
            setTimeout(() => {
                navigate("/")
            }, 6000)
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao avaliar TFG")
        }
    }

    async function avaliarOrientacao(
        orientacao: boolean,
        justificativa?: string,
    ) {
        try {
            await avaliarOrientacaoUsecase.execute({
                tfgId: id ?? "",
                status: orientacao,
                justificativa: !orientacao ? justificativa : undefined,
            })
            handleCloseModal()
            setSnackbarSeverity("success")
            setSnackbarMessage("Orientação avaliada com sucesso")
            setTimeout(() => {
                navigate("/")
            }, 6000)
        } catch (error) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao avaliar orientação")
        }
    }

    async function download(id: string, tipoEntrega: "PARCIAL" | "FINAL") {
        try {
            const result = await baixarTfgUsecase.execute({
                id,
                tipoEntrega,
            })

            window.open(result, "_blank")
        } catch (error) {
            console.log(error)
            setSnackbarSeverity("error")
            setSnackbarMessage("Erro ao avaliar orientação")
        }
    }

    useEffect(() => {
        async function getTfg(id: string) {
            if (id === "") {
                setSnackbarMessage("ID não informado")
                return
            }
            const response = await buscarTfgQuery.execute(id)
            setPreenchimentoTfg(response.toJson())
        }
        getTfg(id ?? "")
    }, [id])

    return (
        <div>
            <Container
                component="main"
                maxWidth="md"
                style={{ marginBottom: "15px" }}
            >
                <div className="mt-3 mt-md-5">
                    <div>
                        <h2 className="text-center pt-3 pb-5">
                            Informações do TFG
                        </h2>
                        <Container
                            style={{
                                justifyContent: "space-between",
                                display: "flex",
                                alignItems: "flex-start",
                                width: "100%",
                                marginBottom: "2rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}
                            >
                                <span>
                                    <strong>Aluno: </strong>
                                    {preenchimentoTfg.aluno}
                                </span>
                                <span>
                                    <strong>Orientador: </strong>
                                    {preenchimentoTfg.orientador}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                }}
                            >
                                <span>
                                    <strong>Coorientador: </strong>
                                    {preenchimentoTfg.coorientador}
                                </span>
                                <span>
                                    <strong>Status: </strong>
                                    {preenchimentoTfg.status}
                                </span>
                            </div>
                        </Container>
                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-titulo"
                        >
                            Título
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="titulo"
                            name="titulo"
                            disabled={true}
                            value={preenchimentoTfg.titulo}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-palavras"
                        >
                            Palavras-chave
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="palavras_chave"
                            name="palavrasChave"
                            disabled={true}
                            value={preenchimentoTfg.palavrasChave}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-introducao"
                        >
                            Introdução/Justificativa/Relevância
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="introducao"
                            name="introducao"
                            disabled={true}
                            value={preenchimentoTfg.introducao}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-objetivos"
                        >
                            Objetivos
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="objetivos"
                            name="objetivos"
                            disabled={true}
                            value={preenchimentoTfg.objetivos}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-bibliografia"
                        >
                            Bibliografia básica
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="bibliografia"
                            name="bibliografia"
                            disabled={true}
                            value={preenchimentoTfg.bibliografia}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-metodologia"
                        >
                            Método de pesquisa
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="metodo_pesquisa"
                            name="metodoPesquisa"
                            disabled={true}
                            value={preenchimentoTfg.metodoPesquisa}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-tecnica"
                        >
                            Técnica de pesquisa
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="tecnica_pesquisa"
                            name="tecnicaPesquisa"
                            disabled={true}
                            value={preenchimentoTfg.tecnicaPesquisa}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-metodologia"
                        >
                            Descrição da metodologia
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="descricao_metodologia"
                            name="descricaoMetodologia"
                            disabled={true}
                            style={{ color: "black" }}
                            value={preenchimentoTfg.descricaoMetodologia}
                        />

                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-resultados"
                        >
                            Resultados esperados
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="resultados_esperados"
                            name="resultadosEsperados"
                            disabled={true}
                            value={preenchimentoTfg.resultadosEsperados}
                        />
                        <InputLabel
                            style={{ textAlign: "left" }}
                            className={"mt-2 mb-0"}
                            id="label-resultados"
                        >
                            Documento
                        </InputLabel>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "20%",
                            }}
                        >
                            {/* TODO: melhorar esse componente de download. Tá horrível */}
                            <FileDownload
                                texto="TFG parcial"
                                enabled={[
                                    "ENTREGA_PARCIAL_ENVIADA",
                                    "ENTREGA_PARCIAL_APROVADA",
                                    "REPROVADO",
                                    "APROVADO",
                                    "ENTREGA_FINAL",
                                ].includes(preenchimentoTfg.status)}
                                download={() => download(id ?? "", "PARCIAL")}
                            />
                            <FileDownload
                                texto="TFG final"
                                enabled={[
                                    "REPROVADO",
                                    "APROVADO",
                                    "ENTREGA_FINAL",
                                ].includes(preenchimentoTfg.status)}
                                download={() => download(id ?? "", "FINAL")}
                            />
                        </div>
                    </div>
                    <div className="mt-3" style={{ width: "100%" }}>
                        {displayAvaliarButton() ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                    modalAvaliar(
                                        preenchimentoTfg.status ===
                                            "MATRICULA_REALIZADA"
                                            ? "ORIENTACAO"
                                            : "NOTA",
                                    )
                                }
                            >
                                Avaliar
                            </button>
                        ) : undefined}
                    </div>
                </div>
            </Container>

            <MessageSnackbar
                severity={snackbarSeverity}
                message={snackbarMessage}
                open={showSnackbar}
                handleClose={() => setShowSnackbar(false)}
            />

            <ModalAvaliarEntrega
                show={showModalNota}
                aluno={preenchimentoTfg.aluno}
                tipoEntrega={
                    preenchimentoTfg.status === "ENTREGA_FINAL"
                        ? "FINAL"
                        : "PARCIAL"
                }
                handleClose={handleCloseModal}
                avaliar={avaliarNota}
            />

            <ModalAvaliarOrientacao
                show={showModalOrientacao}
                handleClose={handleCloseModal}
                avaliar={avaliarOrientacao}
            />
        </div>
    )
}

export default DetalhesTfg
