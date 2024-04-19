import { Banca } from "../../../../../@tfg/domain/entities/Banca"

interface BancaDataProps {
    banca: Banca
    isProfessor: boolean
    redirect: (id: string) => void
    avaliar: () => void
}

export default function BancaData({
    banca,
    isProfessor,
    redirect,
    avaliar,
}: BancaDataProps) {
    const isAvaliado = () => {
        return (
            (banca.getProfessorId() === localStorage.getItem("id") &&
                banca.getNotaApresentacaoProfessor() &&
                banca.getNotaTrabalhoProfessor()) ||
            (banca.getSegundoProfessorId() === localStorage.getItem("id") &&
                banca.getNotaApresentacaoSegundoProfessor() &&
                banca.getNotaTrabalhoSegundoProfessor())
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
                <strong>Título do TFG:</strong> {banca.getTfgNome()}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Data da defesa:</strong>{" "}
                {`${new Date(
                    banca.getData(),
                ).toLocaleDateString()} - ${new Date(banca.getData())
                    .toLocaleTimeString()
                    .split(":")
                    .slice(0, 2)
                    .join(":")}`}
            </div>
            <div
                style={{
                    marginBottom: "0.5rem",
                    color: isAvaliado() ? "green" : "red",
                }}
            >
                <strong>{isAvaliado() ? `AVALIADO` : "NÃO AVALIADO"}</strong>
            </div>
            <div style={{ marginBottom: "0.5rem" }}>{}</div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <div style={{ alignSelf: "flex-start", marginTop: "15px" }}>
                    {!isAvaliado() && isProfessor ? (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={avaliar}
                        >
                            Avaliar
                        </button>
                    ) : undefined}
                </div>
                <div style={{ alignSelf: "flex-end", marginTop: "15px" }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => redirect(banca.getTfgId())}
                    >
                        Ver detalhes
                    </button>
                </div>
            </div>
        </div>
    )
}
