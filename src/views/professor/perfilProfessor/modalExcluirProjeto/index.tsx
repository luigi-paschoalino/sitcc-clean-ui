import { Modal } from "react-bootstrap"
import { ProjetoProps } from "../projetoList/projetoCard"

interface ModalExcluirProjetoProps {
    show: boolean
    handleClose: () => void
    excluir: (id: string) => void
    projeto: ProjetoProps | null
}

export default function ModalExcluirProjeto({
    show,
    handleClose,
    excluir,
    projeto,
}: ModalExcluirProjetoProps) {
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
                    Deseja excluir o projeto {projeto?.titulo}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClose}
                >
                    Não
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        if (projeto) excluir(projeto.id)
                        handleClose()
                    }}
                >
                    Sim
                </button>
            </Modal.Footer>
        </Modal>
    )
}
