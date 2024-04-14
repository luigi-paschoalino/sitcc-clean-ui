import {
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import styled from "@mui/material/styles/styled"
import { Usuario } from "../../../../@usuario/domain/entities/Usuario"

export interface OrientadorTableProps {
    orientadores: Usuario[]
    navigate: any
}

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

export default function OrientadoresTable({
    orientadores,
    navigate,
}: OrientadorTableProps) {
    return (
        <div>
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
                            <StyledTableCell>Orientador</StyledTableCell>
                            <StyledTableCell>Áreas de atuação</StyledTableCell>
                            <StyledTableCell>
                                Perfil do professor
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {orientadores.map((orientador) => (
                            <StyledTableRow key={orientador.getNome()}>
                                <StyledTableCell>
                                    {orientador.getNome()}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {orientador
                                        .getPerfilProfessor()
                                        ?.areasAtuacao.join(", ") ??
                                        "SEM ÁREAS DE ATUAÇÃO CADASTRADAS"}
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(`${orientador.getId()}`)
                                        }
                                    >
                                        Ver perfil
                                    </button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
