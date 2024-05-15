import { ptBR } from "date-fns/locale"
import { Cronograma } from "../../../../../@curso/domain/entities/Cronograma"
import { format } from "date-fns"
import { TIPO_USUARIO } from "../../../../../@usuario/domain/entities/Usuario"
import { Divider } from "@mui/material"

interface CronogramaDataProps {
    cronograma: Cronograma
    displayAtivo: boolean
    openModal: () => void
}

export default function CronogramaData({
    cronograma,
    displayAtivo,
    openModal,
}: CronogramaDataProps) {
    const dataEntregaParcial =
        cronograma.getAtividades()?.find((a) => a.titulo === "ENTREGA_PARCIAL")
            ?.data ?? "SEM DATA DEFINIDA"
    const dataEntregaFinal =
        cronograma.getAtividades()?.find((a) => a.titulo === "ENTREGA_FINAL")
            ?.data ?? "SEM DATA DEFINIDA"
    const dataDefesa =
        cronograma.getAtividades()?.find((a) => a.titulo === "DATA_DEFESA")
            ?.data ?? "SEM DATA DEFINIDA"

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
            <div
                style={{
                    //alinhar texto ao centro
                    width: "100%",
                    marginBottom: "0.5rem",
                }}
            >
                <strong>
                    {cronograma.getAno()}.{""}
                    {cronograma.getSemestre() === "PRIMEIRO" ? "1" : "2"}
                </strong>
            </div>
            <Divider
                style={{
                    marginBottom: "0.5rem",
                    width: "100%",
                }}
            />
            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Data limite da entrega parcial:</strong>{" "}
                {dataEntregaParcial !== "SEM DATA DEFINIDA"
                    ? format(
                          new Date(dataEntregaParcial),
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR },
                      )
                    : dataEntregaParcial}
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Data limite da entrega final:</strong>{" "}
                {dataEntregaFinal !== "SEM DATA DEFINIDA"
                    ? format(
                          new Date(dataEntregaFinal),
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR },
                      )
                    : dataEntregaFinal}
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <strong>Datas de defesa:</strong>{" "}
                {dataDefesa !== "SEM DATA DEFINIDA"
                    ? format(new Date(dataDefesa), "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                      })
                    : dataDefesa}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <div style={{ alignSelf: "flex-start", marginTop: "15px" }}>
                    {displayAtivo && (
                        <div
                            style={{
                                marginBottom: "0.5rem",
                                color: "green",
                            }}
                        >
                            <strong>VIGENTE</strong>
                        </div>
                    )}
                </div>
                {localStorage.getItem("tipo") === TIPO_USUARIO.COORDENADOR && (
                    <div style={{ alignSelf: "flex-end" }}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={openModal}
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
