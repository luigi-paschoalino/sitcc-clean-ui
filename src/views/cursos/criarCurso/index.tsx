import React, { useState, useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Select, MenuItem } from "@mui/material"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import axios from "axios"
import { HttpServiceImpl } from "../../../infra/httpService"
import { UniversidadeHttpGatewayImpl } from "../../../@universidade/infra/gateways/Universidade.gateway"
import { CadastrarCursoUsecase } from "../../../@universidade/application/CadastrarCurso.usecase"
import { ListarUniversidadesQuery } from "../../../@universidade/application/ListarUniversidades.query"

interface UniversidadeProps {
  id: string
  nome: string
  institutos: InstitutoProps[]
}

interface InstitutoProps {
  id: string
  nome: string
}

export interface CursoProps {
  nome: string
  codigo: string
}


export default function CriarCurso() {
  const [inputValues, setInputValues] = useState({
    nome: "",
    codigo:"",
  })
//HTTP Service

const httpService = new HttpServiceImpl()

const universidadeGateway = new UniversidadeHttpGatewayImpl(httpService)
const cadastrarCursoUsecase = new CadastrarCursoUsecase(universidadeGateway)

const listarUniversidadesQuery = new ListarUniversidadesQuery(universidadeGateway)

//States
const [universidades, setUniversidades] = useState<UniversidadeProps[]>([])
const [universidadeAtiva, setUniversidadeAtiva] = useState<UniversidadeProps>(
  {
    id: "",
    nome: "",
    institutos: [],
  },
)
const [institutos, setInstitutos] = useState<InstitutoProps[]>([])
const [institutoAtivo, setInstitutoAtivo] = useState<InstitutoProps>({
  id: "",
  nome: "",
})
const [status, setStatus] = useState<boolean | string>(true)
const [exibirInstituto, setExibirInstituto] = useState(false)


//Funcions
  useEffect(() => {
    async function getUniversidades(): Promise<void> {
      const universidadesData = await listarUniversidadesQuery.execute()
      setUniversidades(universidadesData)
    }
    getUniversidades()
    console.log(universidades)
  }, [])

  useEffect(() => {
    if (universidadeAtiva.id !== "") {
      setInstitutos(universidadeAtiva.institutos)
      setExibirInstituto(true)
    }
  }, [universidadeAtiva])


  function onSubmit() {
    cadastrarCursoUsecase.execute({
      nome: inputValues.nome,
      codigo: inputValues.codigo,
      institutoId: institutoAtivo.id,
    })

    /*axios
      .post(
        `${process.env.REACT_APP_API_URL}/course`,
        {
          nome: inputValues.nome,
          codigo: inputValues.codigo,
          id_instituto: institutoSelected,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/cursos")
        } else {
          setStatus(res.data.error)
        }
      })*/
  }

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }, [])

  const handleSelectUniversity = (universidade: UniversidadeProps) => {
    setUniversidadeAtiva(universidade)
    setExibirInstituto(true)
  }  

  const handleSelectInstitute = (instituto: InstitutoProps) => {
    setInstitutoAtivo(instituto)
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
            Criar Curso
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
            className={"mt-3"}
            id="label-universidade"
          >
            Selecione a universidade
          </InputLabel>
          <Select labelId="label-universiade" placeholder="Selecione">
            {universidades.map((universidade, key) => (
                <MenuItem
                  key={key}
                  value={universidade.id}
                  onClick={() => handleSelectUniversity(universidade)}
                >
                  {universidade.nome}
                </MenuItem>
              ))}
          </Select>
          {exibirInstituto && (
              <>
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-3"}
                  id="label-instituto"
                >
                  Instituto
                </InputLabel>
                <Select labelId="label-instituto" placeholder="Selecione">
                  {institutos.map((instituto, key) => (
                    <MenuItem
                      key={key}
                      value={instituto.id}
                      onClick={() => handleSelectInstitute(instituto)}
                    >
                      {instituto.nome}
                    </MenuItem>
                  ))}
                </Select>
            
              <div className="text-center mt-5">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  onChange={handleOnChange}
                ></TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="codigo"
                  label="Codigo"
                  name="codigo"
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
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
