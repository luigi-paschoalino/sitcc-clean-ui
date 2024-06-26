import { Banca } from "../../../../@tfg/domain/entities/Banca"
import BancaData from "./bancaData"

interface BancaBarProps {
    banca: Banca
    isProfessor: boolean
    redirect: (id: string) => void
    avaliar: () => void
}

export default function BancaBar({
    banca,
    isProfessor,
    redirect,
    avaliar,
}: BancaBarProps) {
    return (
        <div style={{ width: "100%" }}>
            <BancaData
                banca={banca}
                redirect={redirect}
                avaliar={avaliar}
                isProfessor={isProfessor}
            />
        </div>
    )
}
