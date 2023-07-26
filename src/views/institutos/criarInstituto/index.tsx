import React, { useState, useEffect, useCallback } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Select, MenuItem } from "@mui/material"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import InputLabel from "@mui/material/InputLabel"
import { HttpServiceImpl } from "../../../infra/httpService"
import { UniversidadeHttpGatewayImpl } from "../../../@universidade/infra/gateways/Universidade.gateway"
import { CadastrarInstitutoUsecase } from "../../../@universidade/application/CadastrarInstituto.usecase"
import { UniversidadeProps } from "../../usuario/criarUsuario"
import { ListarUniversidadesQuery } from "../../../@universidade/application/ListarUniversidades.query"

interface ValoresInput {
  nome: string
}

//HTTP Service

const httpService = new HttpServiceImpl()

const universidadeGateway = new UniversidadeHttpGatewayImpl(httpService)
const cadastrarInstitutoUsecase = new CadastrarInstitutoUsecase(universidadeGateway)

const listarUniversidadesQuery = new ListarUniversidadesQuery(universidadeGateway)

export default function CriarInstituto() {
  const [universidades, setUniversidades] = useState<UniversidadeProps[]>([])
  const [requisicao, setRequisicao] = useState(false)
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const [universidadeSelecionada, setUniversidadeSelecionada] = useState<UniversidadeProps>(
    {
      id: "",
      nome: "",
      institutos: [],
    },
  )
  const [status, setStatus] = useState<boolean>(true)
  const [valoresInput, setValoresInput] = useState<ValoresInput>({
    nome: "",
  })

  useEffect(() => {
    async function getUniversidades(): Promise<void> {
      const universidadesData = await listarUniversidadesQuery.execute()
      setUniversidades(universidadesData)
    }
    getUniversidades()
    console.log(universidades)
  }, [])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValoresInput({ ...valoresInput, [name]: value })
    },
    [valoresInput],
  )

  const handleChangeUniversidades = (universidade : UniversidadeProps) => {
    setUniversidadeSelecionada(universidade)
  }

  function onSubmit() {  
    console.log(universidadeSelecionada)
    cadastrarInstitutoUsecase.execute({
      nome: valoresInput.nome,
      universidadeId: universidadeSelecionada.id
    })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar Instituto
            </Typography>
            {!status ? (
              <Alert className="my-2" variant="filled" severity="error">
                {status}
              </Alert>
            ) : (
              ""
            )}
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
            <div
              className={"mt-3"}
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            ></div>
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
            >
              {universidades.map((universidade,key) => (
                <MenuItem key={key} value={universidade.id} onClick={() => handleChangeUniversidades(universidade)}>
                  {universidade.nome}
                </MenuItem>
              ))}
            </Select>
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
      </Container>
    </div>
  )
}
