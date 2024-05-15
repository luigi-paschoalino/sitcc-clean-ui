import { InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { Modal } from "react-bootstrap"

interface ModalAvaliarEntregaParcialProps {
    open: boolean
    onClose: () => void
    avaliar: (notaApresentacao: number, notaTrabalho: number) => void
}

export default function ModalAvaliarEntregaFinal({
    open,
    onClose,
    avaliar,
}: ModalAvaliarEntregaParcialProps) {
    const [notaApresentacao, setNotaApresentacao] = useState<number | null>(
        null,
    )
    const [notaTrabalho, setNotaTrabalho] = useState<number | null>(null)

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={open}
            onHide={onClose}
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
                    Avalie a entrega final do aluno
                </p>
                <div className="row">
                    <div className="col">
                        <InputLabel
                            style={{ textAlign: "left", color: "black" }}
                            id="label-nota-apresentacao"
                        >
                            {"Nota de apresentação (40% da nota final)"}
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
                                setNotaApresentacao(parseFloat(e.target.value))
                            }
                        ></TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputLabel
                            style={{ textAlign: "left", color: "black" }}
                            id="label-nota-trabalho"
                        >
                            {"Nota do trabalho (30% da nota final)"}
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
                                setNotaTrabalho(parseFloat(e.target.value))
                            }
                        ></TextField>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onClose}
                >
                    Fechar
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={
                        !notaApresentacao ||
                        !notaTrabalho ||
                        notaApresentacao < 0 ||
                        notaApresentacao > 10 ||
                        notaTrabalho < 0 ||
                        notaTrabalho > 10
                    }
                    onClick={() => {
                        if (notaApresentacao && notaTrabalho)
                            avaliar(notaApresentacao, notaTrabalho)
                    }}
                >
                    Avaliar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
