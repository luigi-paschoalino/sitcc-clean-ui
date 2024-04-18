import { InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { Modal } from "react-bootstrap"

interface ModalRecuperarSenhaProps {
    open: boolean
    handleClose: () => void
    recuperar: (email: string) => void
}

export default function ModalRecuperarSenha({
    open,
    handleClose,
    recuperar,
}: ModalRecuperarSenhaProps) {
    const [email, setEmail] = useState<string>("")

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={open}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recuperar senha
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <InputLabel
                            style={{ textAlign: "left", color: "black" }}
                            id="label-nota"
                        >
                            Endereço de e-mail
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
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
                    disabled={!email.trim()}
                    onClick={() => recuperar(email)}
                >
                    Avaliar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
