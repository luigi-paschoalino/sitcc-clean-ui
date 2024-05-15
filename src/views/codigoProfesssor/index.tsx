import { useEffect, useState } from "react"
import { GerarCodigoProfessorUsecase } from "../../@codigoProfessor/application/GerarCodigoProfessor.usecase"
import { ListarCodigosProfessorQuery } from "../../@codigoProfessor/application/ListarCodigosProfessor.query"
import { CodigoProfessor as CodigoProfessorDomain } from "../../@codigoProfessor/domain/entities/CodigoProfessor"
import { CodigoProfessorHttpGatewayImpl } from "../../@codigoProfessor/infra/gateways/CodigoProfessor.gateway"
import { HttpServiceImpl } from "../../infra/httpService"
import {
    Container,
    styled,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material"
import { Modal } from "react-bootstrap"
import { Button, Table } from "react-bootstrap"
import MessageSnackbar from "../../components/MessageSnackbar"

// HTTP Service
const httpService = new HttpServiceImpl()
const codigoProfessorGateway = new CodigoProfessorHttpGatewayImpl(httpService)
const listarCodigosQuery = new ListarCodigosProfessorQuery(
    codigoProfessorGateway,
)
const gerarCodigoProfessorUsecase = new GerarCodigoProfessorUsecase(
    codigoProfessorGateway,
)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}))

export default function CodigoProfessor() {
    const [codigos, setCodigos] = useState<CodigoProfessorDomain[]>([])
    const [professorEmail, setProfessorEmail] = useState<string>("")

    // Modal
    const [modalOpen, setModalOpen] = useState(false)
    const handleCloseModal = () => setModalOpen(false)

    // Snackbar
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [severity, setSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success")

    async function gerarCodigo() {
        try {
            if (!professorEmail?.trim()) {
                setOpen(true)
                setMessage("Informe o e-mail!")
                setSeverity("warning")
                return
            }
            await gerarCodigoProfessorUsecase.execute({ professorEmail })
            setModalOpen(false)
            setOpen(true)
            setMessage("Código gerado com sucesso!")
            setSeverity("success")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            setOpen(true)
            setMessage("Erro ao gerar código!")
            setSeverity("error")
        }
    }

    useEffect(() => {
        async function getCodigos() {
            const codigos = await listarCodigosQuery.execute()
            setCodigos(codigos)
        }
        getCodigos()
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="md">
                <div className="mt-3 mt-md-5">
                    <h2 className="text-center pt-3 pb-5">
                        Códigos de professores
                    </h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}
                >
                    <Button
                        variant="primary"
                        onClick={() => setModalOpen(true)}
                    >
                        Gerar código
                    </Button>
                </div>
                <TableContainer component="main">
                    <Table
                        style={{
                            width: "100%",
                            borderSpacing: "0",
                            borderCollapse: "collapse",
                            textAlign: "center",
                        }}
                    >
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Código</StyledTableCell>
                                <StyledTableCell>
                                    E-mail vinculado
                                </StyledTableCell>
                                <StyledTableCell>Disponível</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {codigos.map((codigo) => (
                                <StyledTableRow key={codigo.getCodigo()}>
                                    <StyledTableCell>
                                        {codigo.getCodigo()}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {codigo.getEmail()}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {codigo.getDisponivel() ? "Sim" : "Não"}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Modal
                size="lg"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                show={modalOpen}
                onHide={handleCloseModal}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Gerar código de professor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="E-mail do professor"
                        type="email"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setProfessorEmail(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleCloseModal}
                    >
                        Fechar
                    </Button>
                    <Button
                        disabled={!professorEmail?.trim()}
                        onClick={gerarCodigo}
                    >
                        Gerar código
                    </Button>
                </Modal.Footer>
            </Modal>
            <MessageSnackbar
                open={open}
                message={message}
                severity={severity}
                handleClose={() => setOpen(false)}
            />
        </div>
    )
}
