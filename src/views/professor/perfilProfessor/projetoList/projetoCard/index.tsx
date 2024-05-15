import { Card, CardContent, Grid, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

export interface ProjetoProps {
    id: string
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

interface ProjetoCardProps {
    projeto: ProjetoProps
    isProfessor: boolean
    editar: (projeto: ProjetoProps) => void
    excluir: (id: string) => void
}

export default function ProjetoCard({
    projeto,
    isProfessor,
    editar,
    excluir,
}: ProjetoCardProps) {
    return (
        <Grid item key={projeto.id}>
            <Card
                variant="outlined"
                style={{ position: "relative", width: "400px" }}
            >
                <CardContent
                    style={{
                        paddingRight: "40px" /* Ajuste conforme necessário */,
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{
                            overflow: "hidden",
                            whiteSpace: "wrap",
                        }}
                    >
                        {projeto.titulo}
                    </Typography>
                    <Typography color="textSecondary">
                        {projeto.descricao}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Pré-requisitos: {projeto.preRequisitos}
                    </Typography>
                </CardContent>
                {isProfessor && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => editar(projeto)}
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => excluir(projeto.id)}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                )}
            </Card>
        </Grid>
    )
}
