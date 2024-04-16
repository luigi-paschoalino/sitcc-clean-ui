import { Card, CardContent, Grid, Typography } from "@mui/material"

export interface ProjetoProps {
    id: string
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export default function ProjetoCard({ projeto }: { projeto: ProjetoProps }) {
    return (
        <Grid item key={projeto.id}>
            <Card variant="outlined" style={{ width: "400px" }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {projeto.titulo}
                    </Typography>
                    <Typography color="textSecondary">
                        {projeto.descricao}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Pré-requisitos: {projeto.preRequisitos}
                    </Typography>
                    {/* TODO: Ícones de lápis e lixinho para editar ou excluir projetos */}
                </CardContent>
            </Card>
        </Grid>
    )
}
