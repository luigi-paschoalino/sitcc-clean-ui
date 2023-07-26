import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import axios from "axios"

interface TccStatusResponse {
  code: number
  status_tfg_nome: string
}

export default function StatusTcc() {
  const idUsuario = localStorage.getItem("userId")
  // TODO: conferir o tipo do status TCC
  var [statusTcc, setStatusTcc] = useState<string>("")

  useEffect(() => {
    axios
      .get<TccStatusResponse>(
        `${process.env.REACT_APP_API_URL}/users/check/${idUsuario}`,
      )
      .then((response) => {
        if (response.data.code === 200) {
          setStatusTcc(response.data.status_tfg_nome)
        } else {
          setStatusTcc("Sem TCC")
        }
      })
  }, [])

  const idTcc = localStorage.getItem("userTccId")
  const navigate = useNavigate()

  return (
    <Container component="main" maxWidth="sm">
      <div className="mt-3 mt-md-5">
        <div className="text-center">
          <p>O seu status de TCC é:</p>
          <Typography className="pb-5 pt-2" component="h1" variant="h4">
            {statusTcc}
          </Typography>
        </div>
      </div>
    </Container>
  )
}
