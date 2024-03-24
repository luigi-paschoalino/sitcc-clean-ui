import { Tfg } from "../../../../../@tfg/domain/entities/Tfg"

interface OrientacaoDataProps {
    tfg: Tfg
    redirect: (id: string) => void
}

export default function OrientacaoData({ tfg, redirect }: OrientacaoDataProps) {
    return (
        <div
            style={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #ececec",
                boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
                alignItems: "flex-start",
            }}
        >
            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Título do TFG:</strong> {tfg.getTitulo()}
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Aluno:</strong> {tfg.getAluno()}
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Status:</strong> {tfg.getStatus()}
            </div>

            <div style={{ alignSelf: "flex-end", marginTop: "15px" }}>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => redirect(tfg.getId())}
                >
                    Ver detalhes
                </button>
            </div>
        </div>
    )
}
