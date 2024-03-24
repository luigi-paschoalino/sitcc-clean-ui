import Alert from "@mui/material/Alert"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { useParams } from "react-router-dom"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { BuscarTfgQuery } from "../../../@tfg/application/BuscarTfg.query"

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const buscarTfgQuery = new BuscarTfgQuery(tfgGateway)

function DetalhesTfg() {
    const { id } = useParams<{ id: string }>()

    var [status, setStatus] = useState<boolean | string>(true)
    const [nota, setNota] = useState<number>(0)
    const [preenchimentoTfg, setPreenchimentoTfg] = useState<any>({
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

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function modalAvaliar(nota: number) {
        handleShow()
    }

    useEffect(() => {
        async function getTfg(id: string) {
            if (id === "") {
                setStatus("ID não informado")
                return
            }
            const response = await buscarTfgQuery.execute(id)
            setPreenchimentoTfg(response)
        }
        getTfg(id ?? "")
    }, [id])

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <div className="mt-3 mt-md-5">
                    <div>
                        <h2 className="text-center pt-3 pb-5">
                            Informações do TFG
                        </h2>
                        {status !== true ? (
                            <Alert
                                className="mb-3"
                                variant="filled"
                                severity="error"
                            >
                                {status}
                            </Alert>
                        ) : (
                            ""
                        )}
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
                    </div>
                </div>
            </Container>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Avaliação
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: "1.2rem" }}>
                        {/* Esta será a nota parcial do aluno {alunoAtual}! Avalie
                        com cuidado! */}
                    </p>
                    <div className="row">
                        <div className="col">
                            <InputLabel
                                style={{ textAlign: "left", color: "black" }}
                                id="label-nota"
                            >
                                Nota
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nota"
                                name="nota"
                                type="number"
                                onChange={(e) =>
                                    setNota(Number(e.target.value))
                                }
                            ></TextField>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleClose}
                    >
                        Fechar
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        // onClick={avaliar}
                    >
                        Avaliar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DetalhesTfg
