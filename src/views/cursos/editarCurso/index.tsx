import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

interface Curso {
  nome: string;
  codigo: string;
}

export default function EditarCurso() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | boolean>(false);
  const userId = localStorage.getItem("userId");
  const [status, setStatus] = useState<boolean | string>(true);
  const [inputValues, setInputValues] = useState<Curso>({
    nome: "",
    codigo: ""
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/course/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValues({
            nome: res.data.curso.nome,
            codigo: res.data.curso.codigo
          });
        }
        setCurso(true);
      });
  }, []);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }, [inputValues]);

  function onSubmit() {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/courses/${id}`,
        {
          nome: inputValues.nome,
          codigo: inputValues.codigo
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          return navigate("/cursos");
        } else {
          setStatus(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Editar curso
            </Typography>
            {status !== true ? (
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
              value={curso !== false ? inputValues.nome : ""}
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
              value={curso !== false ? inputValues.codigo : ""}
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
              Atualizar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
