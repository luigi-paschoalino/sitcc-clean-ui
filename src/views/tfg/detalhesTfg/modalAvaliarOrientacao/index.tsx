import { Divider, InputLabel, Switch, TextField } from "@mui/material"
import { useState } from "react"
import { Modal } from "react-bootstrap"

interface ModalAvaliarOrientacaoProps {
    show: boolean
    handleClose: () => void
    avaliar: (avaliacao: boolean, justificativa: string) => void
}

export default function ModalAvaliarOrientacao({
    show,
    handleClose,
    avaliar,
}: ModalAvaliarOrientacaoProps) {
    const [justificativa, setJustificativa] = useState<string>("")
    const [aceite, setAceite] = useState<boolean>(false)

    return (
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
                    Avaliação da orientação
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <InputLabel
                            style={{ textAlign: "left", color: "black" }}
                            id="label-nota"
                        >
                            Aprovar orientação?
                        </InputLabel>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "10px" }}>Não</span>
                            <Switch
                                checked={aceite}
                                onChange={(e) => setAceite(e.target.checked)}
                                name="aprovarOrientacao"
                            />
                            <span style={{ marginLeft: "10px" }}>Sim</span>
                        </div>
                        {!aceite && (
                            <>
                                <Divider
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                    }}
                                />
                                <InputLabel
                                    style={{
                                        textAlign: "left",
                                        color: "black",
                                    }}
                                    id="label-nota"
                                >
                                    Justificativa
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="justificativa"
                                    name="justificativa"
                                    type="text"
                                    onChange={(e) =>
                                        setJustificativa(e.target.value)
                                    }
                                ></TextField>
                            </>
                        )}
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
                    disabled={!aceite && justificativa === ""}
                    onClick={() => avaliar(aceite, justificativa)}
                >
                    Avaliar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
