import { Grid } from "@mui/material"
import ProjetoCard, { ProjetoProps } from "./projetoCard"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface ProjetoListProps {
    projetos: ProjetoProps[]
    openModal?: () => void
    isProfessor?: boolean
}
export default function ProjetoList({
    projetos,
    openModal,
    isProfessor = false,
}: ProjetoListProps) {
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
                    <ProjetoCard key={index} projeto={projeto} />
                ))}
            {isProfessor && (
                <AddOutlinedIcon
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                            color: "#f5f5f5",
                            backgroundColor: "#000000",
                            transition: "0.2s ease-in-out",
                        },
                        fontSize: 30,
                        color: "#000000",
                        marginTop: "16px",
                        borderRadius: "100%",
                        transition: "0.2s ease-in-out",
                    }}
                    onClick={openModal}
                />
            )}
        </Grid>
    )
}
