import { useEffect, useState } from "react"
import { NavDropdown } from "react-bootstrap"
import Dropdown from "react-bootstrap/Dropdown"
import {
    Bars,
    Nav,
    NavBtn,
    NavBtnLink,
    NavLink,
    NavMenu,
} from "./NavbarElements"

export default function Navbar() {
    const [auth, setAuth] = useState<boolean>(false)
    const userType = localStorage.getItem("tipo")
    const idUsuario = localStorage.getItem("userId")

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        setAuth(token ? true : false)
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
                                        return (
                                            <>
                                                <NavDropdown.Item href="/registro-tfg">
                                                    Realizar Matrícula
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/meu-tfg">
                                                    Acompanhar TFG
                                                </NavDropdown.Item>
                                            </>
                                        )
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
                                <NavDropdown.Item href="/tfgs">
                                    Minhas Orientações
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/bancas">
                                    Minhas Bancas
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
                                Bem-vindo, {localStorage.getItem("nome")}
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
