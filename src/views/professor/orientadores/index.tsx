import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";

interface PerfilProfessor {
  id: number;
  usuario: {
    nome: string;
  };
}

function Orientadores() {
  const navigate = useNavigate();
  const [orientadores, setOrientadores] = useState<PerfilProfessor[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/professors`, {
        headers: {
          Authorization: localStorage.getItem("accesstoken"),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOrientadores(res.data.perfilProfessor);
        }
      });
  }, []);

  function handleMouseOver(event: React.MouseEvent<HTMLDivElement>) {
    event.currentTarget.style.cursor = "pointer";
  }

  return (
    <div>
      <Container component="main">
        <div className="row p-2">
          {orientadores.map((orientador) => (
            <div
              className="p-1 col-4"
              onMouseOver={handleMouseOver}
              onClick={() => navigate(`/perfil-professor/${orientador.id}`)}
              key={orientador.id}
            >
              <div className="card boxItens" style={{ borderRadius: "10px" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{orientador.usuario.nome}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Orientadores;
