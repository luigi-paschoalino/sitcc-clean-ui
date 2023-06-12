import React, {
  useState,
  useCallback,
  useEffect,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
} from "react"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Select, MenuItem } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "@mui/material"

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

export default function CriarCronograma() {
  const [institutos, setInstitutos] = useState<Instituto[]>([])
  const [status, setStatus] = useState<boolean>(true)
  const [universidades, setUniversidades] = useState<Universidade[]>([])
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cursoSelected, setCursoSelected] = useState<string | null>(null)
  const [requisitionInstituto, setRequisitionInstituto] = useState<
    boolean | null
  >(null)
  const [requisitionCurso, setRequisitionCurso] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState({
    ano: "",
    semestre: "",
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((unis) => {
        let arrayUniversidades: Universidade[] = []
        unis.data.universidades.forEach((uni: any) => {
          arrayUniversidades.push({
            id: uni.id,
            nome: uni.nome,
          })
        })
        setUniversidades(arrayUniversidades)
      })
  }, [])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setInputValues({ ...inputValues, [name]: value })
    },
    [inputValues],
  )

  const handleChangeUniversidade = (event: { value: string }) => {
    searchInstitutes(event.value)
  }

  const handleChangeInstituto = (event: { value: string }) => {
    searchCourses(event.value)
  }

  const handleChangeCurso = (event: { value: string }) => {
    setCursoSelected(event.value)
  }

  function searchInstitutes(valueUniversidade: string) {
    setRequisitionInstituto(false)
    const arrayInstitutos: Instituto[] = []
    setInstitutos(arrayInstitutos)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/universities/${valueUniversidade}/institutes`,
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        res.data.institutos.forEach((data: any) => {
          arrayInstitutos.push({
            id: data.id,
            nome: data.nome,
          })
        })
        setInstitutos(arrayInstitutos)
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
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        res.data.cursos.forEach((data: any) => {
          arrayCursos.push({
            id: data.id,
            nome: data.nome,
          })
        })
        setCursos(arrayCursos)
        setRequisitionCurso(true)
      })
  }

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/timeline`,
        {
          ano: inputValues.ano,
          semestre: inputValues.semestre,
          id_curso: cursoSelected,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/cronogramas")
        } else {
          setStatus(res.data.error)
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
            Criar Cronograma
          </Typography>
          {status !== true ? (
            <Alert className="my-2" variant="filled" severity="error">
              {status}
            </Alert>
          ) : (
            ""
          )}
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
            onChange={() => handleChangeUniversidade}
          >
            {universidades.map((universidade) => (
              <MenuItem key={universidade.id} value={universidade.id}>
                {universidade.nome}
              </MenuItem>
            ))}
          </Select>
          {requisitionInstituto ? (
            <>
              <div>
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
                  onChange={() => handleChangeInstituto}
                >
                  {institutos.map((instituto) => (
                    <MenuItem key={instituto.id} value={instituto.id}>
                      {instituto.nome}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {cursos.length !== 0 ? (
                <div>
                  <div>
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
                      placeholder="Instituto"
                      onChange={() => handleChangeCurso}
                    >
                      {cursos.map((curso) => (
                        <MenuItem key={curso.id} value={curso.id}>
                          {curso.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="text-center mt-5">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="ano"
                      label="Ano"
                      name="ano"
                      onChange={handleOnChange}
                    ></TextField>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="semestre"
                      label="Semestre"
                      name="semestre"
                      onChange={handleOnChange}
                    ></TextField>
                    <div
                      className={"mt-3"}
                      style={{
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    ></div>
                    <Button
                      type="button"
                      variant="contained"
                      fullWidth
                      color="primary"
                      size="large"
                      className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                      onClick={() => onSubmit()}
                    >
                      Cadastrar
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}
