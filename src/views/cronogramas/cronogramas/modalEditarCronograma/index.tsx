import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { TIPO_ATIVIDADE } from "../../../../@curso/domain/entities/Atividade"
import { Cronograma } from "../../../../@curso/domain/entities/Cronograma"

interface ModalEditarCronogramaProps {
    show: boolean
    cronograma: Cronograma
    salvar: (
        tipo: TIPO_ATIVIDADE,
        descricao: string,
        data: Date,
        atividadeId,
    ) => void
    handleClose: () => void
}

export default function ModalEditarCronograma({
    show,
    cronograma,
    salvar,
    handleClose,
}: ModalEditarCronogramaProps) {
    const [atividade, setAtividade] = useState<{
        id: string | null
        tipo: TIPO_ATIVIDADE | null
        descricao: string
        data: Date | null
    }>({
        id: null,
        tipo: null,
        descricao: "",
        data: new Date(),
    })

    function handleChangeAtividade(tipo: TIPO_ATIVIDADE) {
        const hasAtividade = cronograma
            .getAtividades()
            .find((a) => a.titulo === tipo)
        setAtividade({
            id: hasAtividade ? hasAtividade.id : null,
            tipo,
            descricao: hasAtividade?.descricao ?? "",
            data: hasAtividade?.data ? new Date(hasAtividade.data) : new Date(),
        })
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
        >
            <Modal.Header>
                <Modal.Title>Avaliação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                >
                    <InputLabel id="label-atividade">Atividade</InputLabel>
                    <Select
                        labelId="label-atividade"
                        label="Atividade"
                        id="atividade"
                        value={atividade.tipo || ""}
                        onChange={(e) =>
                            handleChangeAtividade(
                                e.target.value as TIPO_ATIVIDADE,
                            )
                        }
                    >
                        <MenuItem value="">
                            <em>Selecione</em>
                        </MenuItem>
                        {Object.values(TIPO_ATIVIDADE).map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo.replace("_", " ")}{" "}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="descricao"
                    label="Descrição"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={atividade.descricao}
                    onChange={(e) =>
                        setAtividade({
                            ...atividade,
                            descricao: e.target.value,
                        })
                    }
                />
                <TextField
                    id="data"
                    label="Data"
                    type="date"
                    variant="standard"
                    margin="normal"
                    value={atividade.data?.toISOString().split("T")[0]}
                    onChange={(e) =>
                        setAtividade({
                            ...atividade,
                            data: new Date(e.target.value),
                        })
                    }
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                    Fechar
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (
                            atividade.tipo &&
                            atividade.descricao &&
                            atividade.data
                        )
                            salvar(
                                atividade.tipo,
                                atividade.descricao,
                                atividade.data,
                                atividade.id,
                            )
                    }}
                    disabled={
                        !atividade.tipo ||
                        !atividade.descricao ||
                        !atividade.data
                    }
                >
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    )
}
