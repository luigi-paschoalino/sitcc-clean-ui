import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Container from "@mui/material/Container"
// import Accordion from "react-bootstrap/Accordion";
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import UpdateIcon from "@mui/icons-material/Update"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Accordion from "@mui/material/Accordion"
import { AccordionDetails, AccordionSummary } from "@mui/material"
const axios = require("axios").default

interface Atividade {
    id: string
    data: Date
    titulo: string
    descricao: string
}

export default function Atividades() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [atividades, setAtividades] = useState<Atividade[]>([])
    const [requisitionAtividade, setRequisitionAtividade] =
        useState<boolean>(false)

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/timelines/${id}/activities`,
                {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                },
            )
            .then((res: any) => {
                let arrayAtividades: Atividade[] = []
                res.data.atividades.forEach((atividade: Atividade) => {
                    arrayAtividades.push({
                        id: atividade.id,
                        data: atividade.data,
                        titulo: atividade.titulo,
                        descricao: atividade.descricao,
                    })
                })
                setAtividades(arrayAtividades)
                setRequisitionAtividade(true)
            })
    }, [])

    function handleDelete(id: string) {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/activities/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
            .then((res: any) => {
                if (res.data.status === 200) {
                    return navigate(0)
                } else {
                    Alert(res.data.error)
                }
            })
    }

    return (
        <Container component="main">
            <div className="mt-3 mt-md-5">
                {atividades.length !== 0 ? (
                    <div>
                        <Typography
                            className="pb-5 pt-2"
                            component="h1"
                            variant="h4"
                        >
                            Atividades
                        </Typography>
                        {atividades.map((atividade) => (
                            <Accordion>
                                <AccordionSummary>
                                    {atividade.titulo}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="accordion-div">
                                        <div>
                                            <p>
                                                <strong>Título:</strong>{" "}
                                                {atividade.titulo} <br />
                                            </p>
                                            <p>
                                                <strong>Descrição:</strong>{" "}
                                                {atividade.descricao} <br />
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/editar-atividade/${atividade.id}/${id}`,
                                                    )
                                                }
                                            >
                                                <UpdateIcon />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(atividade.id)
                                                }
                                            >
                                                <DeleteOutlineIcon />
                                            </button>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                ) : (
                    "oi"
                )}
            </div>
        </Container>
    )
}
