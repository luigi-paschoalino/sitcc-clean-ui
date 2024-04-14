import { Cronograma } from "../../../../@curso/domain/entities/Cronograma"
import CronogramaData from "./cronogramaData"

interface CronogramaBarProps {
    cronograma: Cronograma
    displayAtivo: boolean
    openModal: () => void
}

export default function CronogramaBar({
    cronograma,
    displayAtivo,
    openModal,
}: CronogramaBarProps) {
    return (
        <div style={{ width: "100%" }}>
            <CronogramaData
                cronograma={cronograma}
                displayAtivo={displayAtivo}
                openModal={openModal}
            />
        </div>
    )
}
