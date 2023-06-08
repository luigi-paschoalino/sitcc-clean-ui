import React, { useState, useEffect, useCallback } from "react";
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

interface Universidade {
  id: string;
  nome: string;
}

interface Instituto {
  id: string;
  nome: string;
}

interface Curso {
  id: string;
  nome: string;
  codigo: string;
}

export default function Cursos() {
  const [institutos, setInstitutos] = useState<Instituto[]>([]);
  const [universidades, setUniversidades] = useState<Universidade[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [requisicaoInstituto, setRequisicaoInstituto] = useState<boolean | null>(null);
  const [requisicaoCurso, setRequisicaoCurso] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const handleChangeUniversidade = (event: { value: number; }) => {
    pesquisarInstitutos(event.value);
  };

  const handleChangeInstituto = (event: { value: number; }) => {
    pesquisarCursos(event.value);
  }

  function pesquisarInstitutos(idUniversidade: number) {
    setRequisicaoInstituto(false);
    const arrayInstitutos: Instituto[] = [];
    setInstitutos(arrayInstitutos);
    axios
      .get(`${process.env.REACT_APP_API_URL}/universities/${idUniversidade}/institutes`, {
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
        setRequisicaoInstituto(true);
      });
  }

  function pesquisarCursos(idInstituto: number) {
    setRequisicaoCurso(false);
    const arrayCursos: Curso[] = [];
    setCursos(arrayCursos);
    axios
      .get(`${process.env.REACT_APP_API_URL}/institute/${idInstituto}/courses`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        res.data.cursos.forEach((data: Curso) => {
          arrayCursos.push({
            id: data.id,
            nome: data.nome,
            codigo: data.codigo,
          });
        });
        setCursos(arrayCursos);
        setRequisicaoCurso(true);
      });
  }

  function handleDelete(id: number) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          return navigate(0);
        } else {
          alert(res.data.error);
        }
      });
  }

  return (
    <div>
      <Container component="main">
        <div className="mt-3 mt-md-5">
          <Typography className="pb-5 pt-2 text-center" component="h1" variant="h4">
            Cursos
          </Typography>
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
          {requisicaoInstituto ? (
            <>
              <div>
                <InputLabel
                  style={{ textAlign: "center" }}
                  className={"mt-4"}
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
              {cursos.length !== 0 ? (
                <div>
                  <Typography className="pb-5 pt-2 mt-3" component="h1" variant="h4">
                    Cursos
                  </Typography>
                  <Accordion defaultActiveKey="">
                    {cursos.map((curso) => (
                      <Accordion.Item eventKey={curso.id} key={curso.id}>
                        <Accordion.Header>{curso.nome}</Accordion.Header>
                        <Accordion.Body>
                          <div className="accordion-div">
                            <div>
                              <p><strong>Nome:</strong> {curso.nome} <br /></p>
                              <p><strong>Código:</strong> {curso.codigo} <br /></p>
                            </div>
                            <div>
                              <button onClick={() => navigate(`/editar-curso/${curso.id}`)}>
                                <UpdateIcon />
                              </button>
                              <button onClick={() => handleDelete(curso.id)}>
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
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  )
}