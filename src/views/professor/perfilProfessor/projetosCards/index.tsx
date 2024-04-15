import React from "react"
import { Card, CardContent, Typography, Grid } from "@mui/material"

interface ProjetoProps {
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

interface ProjetoCardProps {
    projetos: ProjetoProps[]
}
export default function ProjetosCards({ projetos }: ProjetoCardProps) {
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            style={{ minHeight: "100vh" }}
        >
            {projetos
                .filter((p) => p.disponivel)
                .map((projeto, index) => (
                    <Grid item key={index}>
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    )
}
