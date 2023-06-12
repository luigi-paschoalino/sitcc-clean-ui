import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"
import InputLabel from "@mui/material/InputLabel"
import { Select, MenuItem } from "@mui/material"
import Typography from "@mui/material/Typography"
import Accordion from "@mui/material/Accordion"
import { AccordionDetails, AccordionSummary } from "@mui/material"
import ArticleIcon from "@mui/icons-material/Article"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

interface Universidade {
  id: string
  nome: string
}

interface Instituto {
  id: string
  nome: string
}

interface Curso {
  id: string
  nome: string
}

interface Cronograma {
  id: string
  ano: string
  semestre: string
}

export default function Cronogramas() {
  const [institutos, setInstitutos] = useState<Instituto[]>([])
  const [universidades, setUniversidades] = useState<Universidade[]>([])
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cronogramas, setCronogramas] = useState<Cronograma[]>([])
  const [requisitionInstituto, setRequisitionInstituto] = useState<
    boolean | null
  >(null)
  const [requisitionCurso, setRequisitionCurso] = useState<boolean | null>(null)
  const [requisitionCronograma, setRequisitionCronograma] = useState<
    boolean | null
  >(null)
  const userType = localStorage.getItem("usertype")
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken")!,
        },
      })
      .then((unis) => {
        const arrayUniversidades: Universidade[] = unis.data.universidades.map(
          (uni: any) => ({
            id: uni.id,
            nome: uni.nome,
          }),
        )
        setUniversidades(arrayUniversidades)
      })
  }, [])

  const handleChangeUniversidade = (event: any) => {
    searchInstitutes(event.value)
  }

  const handleChangeInstituto = (event: any) => {
    searchCourses(event.value)
  }

  const handleChangeCurso = (event: any) => {
    searchCronogramas(event.value)
  }

  function searchInstitutes(valueUniversidade: string) {
    setRequisitionInstituto(false)
    setRequisitionCurso(false)
    const arrayInstitutos: Instituto[] = []
    setInstitutos(arrayInstitutos)
    const arrayCursos: Curso[] = []
    setCursos(arrayCursos)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universities/${valueUniversidade}/institutes`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken")!,
          },
        },
      )
      .then((res) => {
        const institutos: Instituto[] = res.data.institutos.map(
          (data: any) => ({
            id: data.id,
            nome: data.nome,
          }),
        )
        setInstitutos(institutos)
        setRequisitionInstituto(true)
      })
  }

  function searchCourses(valueInstituto: string) {
    setRequisitionCurso(false)
    const arrayCursos: Curso[] = []
    setCursos(arrayCursos)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/institute/${valueInstituto}/courses`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken")!,
          },
        },
      )
      .then((res) => {
        const cursos: Curso[] = res.data.cursos.map((data: any) => ({
          id: data.id,
          nome: data.nome,
        }))
        setCursos(cursos)
        setRequisitionCurso(true)
      })
  }

  function searchCronogramas(valueCurso: string) {
    setRequisitionCronograma(false)
    const arrayCronogramas: Cronograma[] = []
    setCronogramas(arrayCronogramas)
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/${valueCurso}/timelines`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken")!,
        },
      })
      .then((res) => {
        const cronogramas: Cronograma[] = res.data.cronogramas.map(
          (data: any) => ({
            id: data.id,
            ano: data.ano,
            semestre: data.semestre,
          }),
        )
        setCronogramas(cronogramas)
        setRequisitionCronograma(true)
      })
  }

  function handleDelete(id: string) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/timelines/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken")!,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          return navigate(0)
        } else {
          alert(res.data.error)
        }
      })
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          <Typography
            className="pb-5 pt-2 text-center"
            component="h1"
            variant="h4"
          >
            Cronogramas
          </Typography>
          <div className="d-flex">
            <div className="col-4">
              <InputLabel
                style={{ textAlign: "center" }}
                className={"mt-2"}
                id="label-universidade"
              >
                Selecione a universidade
              </InputLabel>
              <Select
                className={"mt-3"}
                labelId="label-universidade"
                variant="outlined"
                defaultValue=""
                fullWidth
                placeholder="Universidade"
                onChange={handleChangeUniversidade}
              >
                {universidades.map((universidade) => (
                  <MenuItem value={universidade.id}>
                    {universidade.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {requisitionInstituto ? (
              <div className="col-4">
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-2"}
                  id="label-instituto"
                >
                  Selecione o instituto
                </InputLabel>
                <Select
                  className={"mt-3"}
                  labelId="label-instituto"
                  variant="outlined"
                  defaultValue=""
                  fullWidth
                  placeholder="Instituto"
                  onChange={handleChangeInstituto}
                >
                  {institutos.map((instituto) => (
                    <MenuItem value={instituto.id}>{instituto.nome}</MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              ""
            )}

            {cursos.length !== 0 ? (
              <div className="col-4">
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-2"}
                  id="label-curso"
                >
                  Selecione o curso
                </InputLabel>
                <Select
                  className={"mt-3"}
                  labelId="label-curso"
                  variant="outlined"
                  defaultValue=""
                  fullWidth
                  placeholder="Curso"
                  onChange={handleChangeCurso}
                >
                  {cursos.map((curso) => (
                    <MenuItem value={curso.id}>{curso.nome}</MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              ""
            )}
          </div>
          {requisitionCronograma ? (
            <>
              <Typography
                className="pb-5 pt-2 text-center mt-5"
                component="h1"
                variant="h4"
              >
                Cronogramas
              </Typography>

              {cronogramas.map((cronograma) => (
                <Accordion>
                  <AccordionSummary>{cronograma.ano}</AccordionSummary>
                  <AccordionDetails>
                    <div className="accordion-div">
                      <div>
                        <p>
                          <strong>Ano:</strong> {cronograma.ano} <br />
                        </p>
                        <p>
                          <strong>Semestre:</strong> {cronograma.semestre}{" "}
                          <br />
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            navigate(`/atividades/${cronograma.id}`)
                          }
                        >
                          <ArticleIcon />
                        </button>
                        {userType === "3" ? (
                          <div>
                            <button
                              onClick={() =>
                                navigate(`/criar-atividade/${cronograma.id}`)
                              }
                            >
                              <AddIcon />
                            </button>
                            <button onClick={() => handleDelete(cronograma.id)}>
                              <DeleteOutlineIcon />
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}
