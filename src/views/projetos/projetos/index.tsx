import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Link from "@mui/material/Link"
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

interface Project {
  id: string
  titulo: string
  descricao: string
  pre_requisito: string
  perfil_professor: {
    id: string
    usuario: {
      nome: string
    }
  }
}

function Projetos() {
  const navigate = useNavigate()
  const [projetosDisponiveis, setProjetosDisponiveis] = useState<Project[]>([])
  const [projetosNaoDisponiveis, setProjetosNaoDisponiveis] = useState<
    Project[]
  >([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setProjetosDisponiveis(res.data.projetosDisponiveis)
          setProjetosNaoDisponiveis(res.data.projetosNaoDisponiveis)
        }
      })
  }, [])

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          {projetosDisponiveis.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Projetos disponíveis
              </Typography>
              {projetosDisponiveis.map((projeto) => (
                <Accordion>
                  <AccordionSummary>{projeto.titulo}</AccordionSummary>
                  <AccordionDetails>
                    <p>
                      <strong>Descrição:</strong> {projeto.descricao} <br />
                    </p>
                    <p>
                      <strong>Pré Requisitos:</strong> {projeto.pre_requisito}
                      <br />
                    </p>
                    <p>
                      <strong>Professor:</strong>{" "}
                      <Link
                        href={`/perfil-professor/${projeto.perfil_professor.id}`}
                      >
                        {projeto.perfil_professor.usuario.nome}
                      </Link>
                    </p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-3 mt-md-5">
          {projetosNaoDisponiveis.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2" component="h1" variant="h4">
                Projetos não disponíveis
              </Typography>
              {projetosNaoDisponiveis.map((projeto) => (
                <Accordion>
                  <AccordionSummary>{projeto.titulo}</AccordionSummary>
                  <AccordionDetails>
                    <p>
                      <strong>Descrição:</strong> {projeto.descricao} <br />
                    </p>
                    <p>
                      <strong>Pré Requisitos:</strong> {projeto.pre_requisito}
                      <br />
                    </p>
                    <p>
                      <strong>Professor:</strong>{" "}
                      <Link
                        href={`/perfil-professor/${projeto.perfil_professor.id}`}
                      >
                        {projeto.perfil_professor.usuario.nome}
                      </Link>
                    </p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}

export default Projetos
