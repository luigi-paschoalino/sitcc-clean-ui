import React, { useState, useCallback, ChangeEvent } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { HttpServiceImpl } from "../../../infra/httpService";
import { UniversidadeHttpGatewayImpl } from "../../../@universidade/infra/gateways/Universidade.gateway";
import { CadastrarUniversidadeUsecase } from "../../../@universidade/application/CadastrarUniversidade.usecase";


interface InputValues {
  nome: string;
}

export default function CriarUniversidade() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [status, setStatus] = useState<boolean>(true);
  const [inputValues, setInputValues] = useState<InputValues>({
    nome: ""
  });
  
  //HTTP Service
  const httpService = new HttpServiceImpl()

  const universidadeGateway = new UniversidadeHttpGatewayImpl(httpService)
  const cadastrarUniversidadeUsecase = new CadastrarUniversidadeUsecase(universidadeGateway)

  /* States */ 

  const [nome, setNome] = useState<string>("")	

  /* Functions */

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }, [inputValues]);

  function onSubmit() {
   
   
    
    /*axios
      .post(
        `${process.env.REACT_APP_API_URL}/university`,
        {
          nome: inputValues.nome
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          return navigate("/universidades");
        } else {
          setStatus(res.data.error);
        }
      });*/
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography className="pb-5 pt-2" component="h1" variant="h4">
              Criar universidade
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
            ></TextField>
            <div
              className={"mt-3"}
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
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
              Cadastrar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}