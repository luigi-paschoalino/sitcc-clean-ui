import { Tfg } from "../../../../@tfg/domain/entities/Tfg"
import OrientacaoData from "./orientacaoData"

interface OrientacaoBarProps {
    tfg: Tfg
    displayAtivo: boolean
    redirect: (id: string) => void
}

export default function OrientacaoBar({
    tfg,
    displayAtivo,
    redirect,
}: OrientacaoBarProps) {
    return (
        <div style={{ width: "100%" }}>
            <OrientacaoData
                tfg={tfg}
                displayAtivo={displayAtivo}
                redirect={redirect}
            />
        </div>
    )
}
