import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";

interface Orientacao {
  id: string;
  nome: string;
}

function AceitarOrientacao() {
  const [requisicao, setRequisicao] = useState<boolean>(false);
  const [orientacoes, setOrientacoes] = useState<Orientacao[]>([]);
  const idUsuario = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tfg/search-status-orientation/${idUsuario}`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status !== 200) {
          setOrientacoes([]);
        } else {
          setOrientacoes(res.data.resultsTfg);
        }
        setRequisicao(true);
      });
  }, []);

  function rejeitar(idTcc: string) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
        {
          status_tfg: "orientacao_recusada",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
      });
  }

  function aceitar(idTcc: string) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tfg/${idTcc}/status`,
        {
          status_tfg: "orientacao_aceita",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
      });
  }

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div className="mt-3 mt-md-5">
          {requisicao === true ? (
            orientacoes.length > 0 ? (
              <div>
                <h2 className="text-center pt-3 pb-5">Orientações</h2>
                <div>
                  {orientacoes.map((orientacao) => (
                    <div className="py-1 d-flex align-items-center">
                      <div
                        className="col-8 py-2"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          border: "1px solid #ececec",
                          boxShadow:
                            "0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),0 2px 1px -1px rgb(0 0 0 / 12%)",
                        }}
                      >
                        {orientacao.nome}
                      </div>
                      <div className="mx-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => rejeitar(orientacao.id)}
                        >
                          Rejeitar
                        </button>{" "}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => aceitar(orientacao.id)}
                        >
                          Aprovar
                        </button>{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 className="text-center py-5">
                Não existem orientações a serem aceitas/recusadas
              </h3>
            )
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default AceitarOrientacao;
