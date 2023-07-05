import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Switch from "@mui/material/Switch"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import { Select, MenuItem } from "@mui/material"
import axios from "axios"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TccHttpGatewayImpl } from "../../../@tfg/infra/Tcc.gateway"
import { CadastrarTccUsecase } from "../../../@tfg/application/CadastrarTcc.usecase"

interface Professor {
  value: string
  label: string
}

//HTTP Service
const httpService = new HttpServiceImpl()
const tccGateway = new TccHttpGatewayImpl(httpService)
const cadastrarTccUsecase = new CadastrarTccUsecase(tccGateway)

export default function MatriculaTfg() {
  const [professores, setProfessores] = useState<Professor[]>([])
  const [professores1, setProfessores1] = useState<Professor[]>([])
  const [professores2, setProfessores2] = useState<Professor[]>([])
  const idUsuario = localStorage.getItem("userId")
  const [checked, setChecked] = useState(true)
  const [orientadorSelected, setOrientadorSelected] = useState<string | null>(
    null,
  )
  const [coorientadorSelected, setCoorientadorSelected] = useState<
    string | null
  >(null)
  const [status, setStatus] = useState<string | boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/type`,
        { perfil_usuario: 2 },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        },
      )
      .then((profs) => {
        let arrayProfessores: Professor[] = []
        let arrayProfessores2: Professor[] = []
        profs.data.forEach((prof: any) => {
          arrayProfessores.push({
            value: prof.id,
            label: prof.nome,
          })
          arrayProfessores2.push({
            value: prof.id,
            label: prof.nome,
          })
        })
        setProfessores(arrayProfessores)
        setProfessores1(arrayProfessores)
        setProfessores2(arrayProfessores2)
      })
  }, [])
  

  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleChangeOrientador = (event: any) => {
    const filtered = professores.filter((prof) => {
      return prof.value !== event.value
    })
    setProfessores2(filtered)
    setOrientadorSelected(event.value)
  }

  const handleChangeCoorientador = (event: any) => {
    const filtered = professores.filter((prof) => {
      return prof.value !== event.value
    })
    setProfessores1(filtered)
    setCoorientadorSelected(event.value)
  }

  // function onSubmit() {
  //   if (orientadorSelected !== null) {
  //     if (coorientadorSelected === null && checked) {
  //       setStatus("Coorientador está marcado e precisa ser selecionado")
  //       return
  //     }
  
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/tfg`,
  //         {
  //           titulo: " ",
  //           palavras_chave: " ",
  //           introducao: " ",
  //           objetivos: " ",
  //           bibliografia: " ",
  //           metodologia: " ",
  //           resultados: " ",
  //           status: "matricula_realizada",
  //         },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("accesstoken"),
  //           },
  //         },
  //       )
  //       .then((response) => {
  //         if (response.data.status === 200) {
  //           let idTfg = response.data.tfg.id
  //           let idOrientador = orientadorSelected
  //           let idCoorientador = coorientadorSelected
  //           axios
  //             .post(
  //               `${process.env.REACT_APP_API_URL}/user_tfg`,
  //               {
  //                 id_usuario: idUsuario,
  //                 id_tfg: idTfg,
  //                 id_funcao: 1,
  //               },
  //               {
  //                 headers: {
  //                   Authorization: localStorage.getItem("accesstoken"),
  //                 },
  //               },
  //             )
  //             .then((response) => {})
  //           axios
  //             .post(
  //               `${process.env.REACT_APP_API_URL}/user_tfg`,
  //               {
  //                 id_usuario: idOrientador,
  //                 id_tfg: idTfg,
  //                 id_funcao: 2,
  //               },
  //               {
  //                 headers: {
  //                   Authorization: localStorage.getItem("accesstoken"),
  //                 },
  //               },
  //             )
  //             .then((response) => {})
  //           if (checked) {
  //             axios
  //               .post(
  //                 `${process.env.REACT_APP_API_URL}/user_tfg`,
  //                 {
  //                   id_usuario: idCoorientador,
  //                   id_tfg: idTfg,
  //                   id_funcao: 3,
  //                 },
  //                 {
  //                   headers: {
  //                     Authorization: localStorage.getItem("accesstoken"),
  //                   },
  //                 },
  //               )
  //               .then((response) => {})
  //           }
  //           localStorage.setItem("userTccStatus", "matricula_realizada")
  //           return navigate("/")
  //         } else {
  //           setStatus(response.data.error)
  //         }
  //       })
  //   } else {
  //     setStatus("Orientador precisa ser selecionado")
  //   }
  // }

  return (
    <Container component="main" maxWidth="xs">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
            Registrar Matrícula
          </Typography>
          {status !== true ? (
            <Alert className="mt-2 mb-4" variant="filled" severity="error">
              {status}
            </Alert>
          ) : (
            ""
          )}
          <div className="imc_div">
            <InputLabel>Selecione o Professor Orientador</InputLabel>
            <Select
              className={"mt-3"}
              labelId="label-tipo-usuario"
              placeholder="Professor Orientador"
              onChange={handleChangeOrientador}
            >
              {professores1.map((professor) => (
                <MenuItem value={professor.value}>{professor.label}</MenuItem>
              ))}
            </Select>
          </div>
          <div
            className={"mt-3"}
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <InputLabel
              style={{ textAlign: "center" }}
              className={"mt-2"}
              id="label-professor-imc"
            >
              Possui coorientador?
            </InputLabel>
            <Switch checked={checked} onChange={switchHandler} />
          </div>

          {checked === true ? (
            <div className="imc_div">
              <Select
                className={"mt-3"}
                labelId="label-tipo-usuario"
                placeholder="Professor Coorientador"
                onChange={handleChangeCoorientador}
              >
                {professores2.map((professor) => (
                  <MenuItem value={professor.value}>{professor.label}</MenuItem>
                ))}
              </Select>
            </div>
          ) : (
            ""
          )}
        </div>
        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
          size="large"
          className="mb-3 mb-md-4 mt-4 backgroundcolor2"
          onClick={() => onSubmit()}
        >
          Registrar
        </Button>
      </div>
    </Container>
  )
}
