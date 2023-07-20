import React, { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { NavDropdown } from "react-bootstrap"
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements"
import axios from "axios"

enum UserTccStatus {
    MatriculaAprovada = "matricula_aprovada",
    RegistroDeProjetoAprovado = "registro_de_projeto_aprovado",
    TfgParcialAprovado = "tfg_parcial_aprovado",
    SemTcc = "sem_tcc",
    TfgFinalEnviado = "tfg_final_enviado",
}

export default function Navbar() {
    const [auth, setAuth] = useState<boolean>(false)
    const userType = localStorage.getItem("tipo")
    const idUsuario = localStorage.getItem("userId")
    const [userTccStatus, setUserTccStatus] = useState<UserTccStatus | null>(
        null,
    )

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        setAuth(token ? true : false)

        /*if (userType === "1") {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/users/check/${idUsuario}`,
                )
                .then((response) => {
                    if (response.data.code === 200) {
                        setUserTccStatus(response.data.status as UserTccStatus)
                        localStorage.setItem(
                            "userTccStatus",
                            response.data.status,
                        )
                        localStorage.setItem("userTccId", response.data.id)
                    } else {
                        setUserTccStatus(UserTccStatus.SemTcc)
                        localStorage.setItem(
                            "userTccStatus",
                            UserTccStatus.SemTcc,
                        )
                    }
                })
        }*/
    }, [userType, idUsuario])

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img
                        style={{ width: "10vh" }}
                        src={require("../images/logocompleto.png")}
                        alt="Logo TFG"
                    />
                </NavLink>
                <Bars />
                {auth === true ? (
                    <NavMenu>
                        {userType === "ALUNO" /*&& userTccStatus !== null*/ ? (
                            <>
                                <NavDropdown title="Meu TFG">
                                    {(() => {
                                        switch (userTccStatus) {
                                            case "matricula_aprovada":
                                                return (
                                                    <NavDropdown.Item href="/registro-tfg">
                                                        Registro de Tfg
                                                    </NavDropdown.Item>
                                                )
                                            case "registro_de_projeto_aprovado":
                                                return (
                                                    <NavDropdown.Item href="/enviar-tcc-parcial">
                                                        Enviar TCC Parcial
                                                    </NavDropdown.Item>
                                                )
                                            case "tfg_parcial_aprovado":
                                                return (
                                                    <NavDropdown.Item href="/enviar-tcc-final">
                                                        Enviar TCC Final
                                                    </NavDropdown.Item>
                                                )
                                            case "sem_tcc":
                                                return (
                                                    <NavDropdown.Item href="/realizar-matricula">
                                                        Realizar Matrícula
                                                    </NavDropdown.Item>
                                                )
                                            case "tfg_final_enviado":
                                                return (
                                                    <NavDropdown.Item href="/criar-banca">
                                                        Marcar Banca Avalidadora
                                                    </NavDropdown.Item>
                                                )
                                            default:
                                                return (
                                                    <NavDropdown.Item href="/status-tcc">
                                                        Status TCC
                                                    </NavDropdown.Item>
                                                )
                                        }
                                    })()}
                                </NavDropdown>
                            </>
                        ) : (
                            ""
                        )}
                        {userType !== "ALUNO" ? (
                            <NavDropdown
                                title="Gerenciar TCCs"
                                className="dropdownNav"
                            >
                                {userType === "3" ? (
                                    <>
                                        <NavDropdown.Item href="/confirmar-matricula">
                                            Confirmar matrícula
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/confirmar-projeto">
                                            Confirmar registro
                                        </NavDropdown.Item>
                                    </>
                                ) : (
                                    ""
                                )}
                                <NavDropdown.Item href="/aceitar-orientacao">
                                    Aceitar Orientação
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/avaliar-tcc-parcial">
                                    Avaliar TCC Parcial
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            ""
                        )}
                        <NavDropdown title="Projetos" className="dropdownNav">
                            <>
                                {userType !== "ALUNO" ? (
                                    <>
                                        <NavDropdown.Item href="/meu-perfil-professor">
                                            Perfil professor
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/tcc">
                                            Criar Projeto
                                        </NavDropdown.Item>
                                    </>
                                ) : (
                                    ""
                                )}
                                <NavDropdown.Item href="/orientadores">
                                    Orientadores
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/projetos">
                                    Projetos
                                </NavDropdown.Item>
                            </>
                        </NavDropdown>
                        {userType === "3" ? (
                            <NavDropdown
                                title="Cronograma"
                                className="dropdownNav"
                            >
                                <NavDropdown.Item href="/criar-cronograma">
                                    Criar cronograma
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/cronogramas">
                                    Visualizar cronograma
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavLink to="/cronogramas">Cronograma</NavLink>
                        )}
                        {userType === "3" ? (
                            <>
                                <NavDropdown
                                    title="Gerencial"
                                    className="dropdownNav"
                                >
                                    <NavDropdown.Item href="/criar-usuarios">
                                        Criar usuarios
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/criar-universidade">
                                        Criar universidade
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/universidades">
                                        Visualizar universidades
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/criar-instituto">
                                        Criar institutos
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/institutos">
                                        Visualizar institutos
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/criar-curso">
                                        Criar curso
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/cursos">
                                        Visualizar cursos
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            ""
                        )}
                        {userType === "3" ? (
                            <>
                                <NavDropdown
                                    title="Template"
                                    className="dropdownNav"
                                >
                                    <NavDropdown.Item href="/criar-template">
                                        Criar template
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/template">
                                        Visualizar template
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <NavLink to="/template">Template</NavLink>
                        )}
                    </NavMenu>
                ) : (
                    ""
                )}
                <NavBtn>
                    {auth === false ? (
                        <NavBtnLink to="/login">Fazer login</NavBtnLink>
                    ) : (
                        <Dropdown>
                            <Dropdown.Toggle
                                className="backgroundcolor1"
                                style={{ color: "white", borderColor: "white" }}
                                id="dropdown-basic"
                            >
                                Bem Vindo, {localStorage.getItem("nome")}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/editar-usuario">
                                    Editar usuário
                                </Dropdown.Item>
                                <Dropdown.Item href="/logout">
                                    Sair
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </NavBtn>
            </Nav>
        </>
    )
}
