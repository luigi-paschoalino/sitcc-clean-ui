import React, { useState, useCallback } from "react"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import DatePicker from "@mui/lab/DatePicker"
import "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import DateTimePicker from "@mui/lab/DateTimePicker"

export default function CriarAtividade() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState({
    data: new Date(),
    titulo: "",
    descricao: "",
  })

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setInputValues({ ...inputValues, [name]: value })
    },
    [inputValues],
  )

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [status, setStatus] = useState<string>("")

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date)
      setInputValues({ ...inputValues, data: date })
    }
  }

  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/activity`,
        {
          data: selectedDate,
          titulo: inputValues.titulo,
          descricao: inputValues.descricao,
          id_cronograma: id,
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
            Criar Atividade
          </Typography>
          <div className="text-center mt-5">
            <DatePicker utils={DateFnsUtils}>
              <DateTimePicker
                className="mt-2"
                autoOk
                required
                fullWidth
                variant="inline"
                inputVariant="outlined"
                label="Data"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DatePicker>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="titulo"
              label="Titulo"
              name="titulo"
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descricao"
              name="descricao"
              onChange={handleOnChange}
            />
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
      </Container>
    </div>
  )
}
