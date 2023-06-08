import React, { useState, useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

interface Universidade {
  id: string;
  nome: string;
}

interface Instituto {
  id: string;
  nome: string;
}

export default function CriarCurso() {
  const [universidades, setUniversidades] = useState<Universidade[]>([]);
  const [institutos, setInstitutos] = useState<Instituto[]>([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(true);
  const [requisition, setRequisition] = useState<boolean | null>(null);
  const [institutoSelected, setInstitutoSelected] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState({
    nome: "",
    codigo: ""
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((unis) => {
        let arrayUniversidades: Universidade[] = [];
        unis.data.universidades.forEach((uni: Universidade) => {
          arrayUniversidades.push({
            id: uni.id,
            nome: uni.nome,
          });
        });
        setUniversidades(arrayUniversidades);
      });
  }, []);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }, [inputValues]);

  const handleChangeUniversidade = (event: any) => {
    searchInstitutes(event.value);
  };

  const handleChangeInstituto = (event: any) => {
    setInstitutoSelected(event.value);
  };

  function searchInstitutes(valueUniversidade: number) {
    setRequisition(false);
    const arrayInstitutos: Instituto[] = [];
    setInstitutos(arrayInstitutos);
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities/${valueUniversidade}/institutes`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        res.data.institutos.forEach((data: Instituto) => {
          arrayInstitutos.push({
            id: data.id,
            nome: data.nome,
          });
        });
        setInstitutos(arrayInstitutos);
        setRequisition(true);
      });
  }

  function onSubmit() {
    axios
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
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate("/cursos");
        } else {
          setStatus(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          <Typography className="pb-5 pt-2 text-center" component="h1" variant="h4">
            Criar Curso
          </Typography>
          {status !== true ? (
            <Alert className="my-2" variant="filled" severity={classStatus}>
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
            options={universidades}
            fullWidth
            placeholder="Universidade"
            onChange={handleChangeUniversidade}
          />
          {requisition ? (
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
                  options={institutos}
                  fullWidth
                  placeholder="Instituto"
                  onChange={handleChangeInstituto}
                />
              </div>
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
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}