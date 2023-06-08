import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from "@mui/material/Typography";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Instituto {
  id: number;
  nome: string;
}

interface Universidade {
  id: number;
  nome: string;
}

export default function Institutos() {
  const [institutos, setInstitutos] = useState<Instituto[]>([]);
  const [universidades, setUniversidades] = useState<Universidade[]>([]);
  const [requisition, setRequisition] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/universities`, {
      headers: {
        Authorization: localStorage.getItem("accesstoken"),
      },
    })
    .then((unis) => {
      const arrayUniversidades: Universidade[] = unis.data.universidades.map((uni) => ({
        id: uni.id,
        nome: uni.nome,
      }));
      setUniversidades(arrayUniversidades);
    });
  }, []);

  const handleChangeUniversidade = (event: any) => {
    searchInstitutes(event.value);
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
        const dataInstitutos: Instituto[] = res.data.institutos.map((data) => ({
          id: data.id,
          nome: data.nome,
        }));
        setInstitutos(dataInstitutos);
        setRequisition(true);
      });
  }

  function handleDelete(id: number) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/institutes/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      }).then((res) => {
        if (res.data.status === 200) {
          return navigate(0);
        } else {
          Alert(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
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
          {institutos.length !== 0 ? (
            <div>
              <Typography className="pb-5 pt-2 mt-5" component="h1" variant="h4">
                Institutos
              </Typography>
              <Accordion defaultActiveKey="">
                {institutos.map((instituto) => (
                  <Accordion.Item eventKey={instituto.id.toString()} key={instituto.id}>
                    <Accordion.Header>{instituto.nome}</Accordion.Header>
                    <Accordion.Body>
                        <div className="accordion-div">
                        <p><strong>Nome:</strong> {instituto.nome} <br/></p>
                        <div>
                          <button onClick={() => navigate(`/editar-instituto/${instituto.id}`)}>
                            <UpdateIcon />
                          </button>
                          <button onClick={() => handleDelete(instituto.id)}>
                            <DeleteOutlineIcon />
                          </button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}
