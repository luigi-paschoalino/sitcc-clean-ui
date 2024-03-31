import { Tfg } from "../../../../../@tfg/domain/entities/Tfg"

interface OrientacaoDataProps {
    tfg: Tfg
    displayAtivo: boolean
    redirect: (id: string) => void
}

export default function OrientacaoData({
    tfg,
    displayAtivo,
    redirect,
}: OrientacaoDataProps) {
    function isAtivo(): boolean {
        return !["APROVADO", "REPROVADO", "ORIENTACAO_RECUSADA"].includes(
            tfg.getStatus(),
        )
    }
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

            {isAtivo() && displayAtivo && (
                <div
                    style={{
                        marginBottom: "0.5rem",
                        color: "green",
                    }}
                >
                    <strong>ATIVO</strong>
                </div>
            )}

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
