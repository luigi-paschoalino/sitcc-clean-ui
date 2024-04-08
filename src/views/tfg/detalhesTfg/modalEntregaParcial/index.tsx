import { InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { Modal } from "react-bootstrap"

interface ModalAvaliarEntregaParcialProps {
    show: boolean
    aluno: string
    handleClose: () => void
    avaliar: (nota: number) => void
}

export default function ModalAvaliarEntregaParcial({
    show,
    aluno,
    handleClose,
    avaliar,
}: ModalAvaliarEntregaParcialProps) {
    const [nota, setNota] = useState<number>(0)

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
                    Avaliação
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: "1.2rem" }}>
                    Esta será a nota parcial de {aluno}. Avalie com cuidado!
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
                                setNota(parseFloat(e.target.value))
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
                    disabled={nota < 0 || nota > 10}
                    onClick={() => avaliar(nota)}
                >
                    Avaliar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
