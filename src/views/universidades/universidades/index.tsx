import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import UpdateIcon from "@mui/icons-material/Update"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

interface Universidade {
  id: number
  nome: string
}

export default function Universidades() {
  const [universidades, setUniversidades] = useState<Universidade[]>([])
  const navigate = useNavigate()
  const [status, setStatus] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUniversidades(res.data.universidades)
        }
      })
  }, [])

  function handleDelete(id: number) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/universities/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          return navigate(0)
        } else {
          setStatus(res.data.error)
        }
      })
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          {universidades.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Universidades
              </Typography>
              {status !== true ? (
                <Alert className="my-2" variant="filled" severity="error">
                  {status}
                </Alert>
              ) : (
                ""
              )}
              {universidades.map((universidade) => (
                <Accordion>
                  <AccordionSummary>{universidade.nome}</AccordionSummary>
                  <AccordionDetails>
                    <div className="accordion-div">
                      <p>
                        <strong>Nome:</strong> {universidade.nome} <br />
                      </p>
                      <div>
                        <button
                          onClick={() =>
                            navigate(`/editar-universidade/${universidade.id}`)
                          }
                        >
                          <UpdateIcon />
                        </button>
                        <button onClick={() => handleDelete(universidade.id)}>
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
    </div>
  )
}
