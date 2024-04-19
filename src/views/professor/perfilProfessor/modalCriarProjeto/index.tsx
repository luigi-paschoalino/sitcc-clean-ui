import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { ProjetoProps } from "../projetoList/projetoCard"

interface ModalCriarProjetoProps {
    show: boolean
    editing: boolean
    handleClose: () => void
    criar: (projeto: ProjetoProps) => void
    editar: (projeto: ProjetoProps) => void
    projeto: ProjetoProps | null
}

export default function ModalCriarProjeto({
    show,
    editing,
    handleClose,
    criar,
    editar,
    projeto,
}: ModalCriarProjetoProps) {
    const [projetoDados, setProjetoDados] = useState<ProjetoProps>({
        id: "",
        titulo: "",
        descricao: "",
        preRequisitos: "",
        disponivel: false,
    })

    useEffect(() => {
        if (projeto && editing) {
            setProjetoDados(projeto)
        } else {
            setProjetoDados({
                id: "",
                titulo: "",
                descricao: "",
                preRequisitos: "",
                disponivel: false,
            })
        }
    }, [projeto, editing, show])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjetoDados({
            ...projetoDados,
            [e.target.name]: e.target.value,
        })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjetoDados({
            ...projetoDados,
            disponivel: e.target.checked,
        })
    }

    const handleSubmit = () => {
        editing ? editar(projetoDados) : criar(projetoDados)
        handleClose()
    }

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
                    value={projetoDados.titulo}
                    onChange={handleChange}
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
                    value={projetoDados.descricao}
                    onChange={handleChange}
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
                    value={projetoDados.preRequisitos}
                    onChange={handleChange}
                />
                {editing && (
                    <FormGroup>
                        <FormControlLabel
                            label="Disponível"
                            control={
                                <Checkbox
                                    style={{ color: "black" }}
                                    checked={projetoDados.disponivel}
                                    onChange={handleCheckboxChange}
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
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    {editing ? "Editar" : "Criar"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}
