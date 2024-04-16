import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { Modal } from "react-bootstrap"
import { ProjetoProps } from "../projetoList/projetoCard"

interface ModalCriarProjetoProps {
    show: boolean
    editing: boolean
    handleClose: () => void
    projeto: ProjetoProps | null
}

export default function ModalCriarProjeto({
    show,
    editing,
    handleClose,
    projeto,
}: ModalCriarProjetoProps) {
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
                    {editing ? "Editar projeto" : "Criar projeto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="titulo"
                    name="titulo"
                    type="titulo"
                    placeholder="Título"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="descricao"
                    name="descricao"
                    type="descricao"
                    placeholder="Descrição"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="preRequisitos"
                    name="preRequisitos"
                    type="preRequisitos"
                    placeholder="Pré-requisitos"
                />
                {editing && (
                    <FormGroup>
                        <FormControlLabel
                            label="Disponível"
                            control={
                                <Checkbox
                                    style={{ color: "black" }}
                                    checked={projeto?.disponivel}
                                />
                            }
                        />
                    </FormGroup>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClose}
                >
                    Fechar
                </button>
                <button type="button" className="btn btn-primary">
                    Avaliar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
