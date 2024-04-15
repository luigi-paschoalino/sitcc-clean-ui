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
import { TIPO_USUARIO } from "../@usuario/domain/entities/Usuario"

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
                        {userType === "ALUNO" ? (
                            <>
                                <NavDropdown title="TFG">
                                    {(() => {
                                        return (
                                            <>
                                                <NavDropdown.Item href="/matricula-tfg">
                                                    Realizar Matrícula
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/tfgs">
                                                    Meus TFGs
                                                </NavDropdown.Item>
                                            </>
                                        )
                                    })()}
                                </NavDropdown>
                            </>
                        ) : (
                            ""
                        )}
                        {userType === "PROFESSOR" ? (
                            <NavDropdown
                                title="Gerenciar TCCs"
                                className="dropdownNav"
                            >
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
                        {userType === "COORDENADOR" ? (
                            <NavDropdown
                                title="Gerenciar bancas"
                                className="dropdownNav"
                            >
                                <NavDropdown.Item href="/cadastrar-banca">
                                    Cadastrar banca
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/bancas">
                                    Visualizar bancas
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            ""
                        )}
                        <NavDropdown title="Projetos" className="dropdownNav">
                            <>
                                <NavDropdown.Item href="/orientadores">
                                    Orientadores
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item href="/projetos">
                                    Projetos
                                </NavDropdown.Item> */}
                            </>
                        </NavDropdown>
                        <NavDropdown title="Cronograma" className="dropdownNav">
                            {userType === "COORDENADOR" && (
                                <NavDropdown.Item href="/cronogramas/criar">
                                    Criar cronograma
                                </NavDropdown.Item>
                            )}
                            <NavDropdown.Item href="/cronogramas">
                                Visualizar cronograma vigente
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavLink to="/template">Template</NavLink>
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
                                {userType === TIPO_USUARIO.PROFESSOR && (
                                    <Dropdown.Item href="/perfil-professor">
                                        Meu perfil
                                    </Dropdown.Item>
                                )}
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
