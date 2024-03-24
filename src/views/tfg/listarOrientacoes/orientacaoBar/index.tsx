import { Tfg } from "../../../../@tfg/domain/entities/Tfg"
import OrientacaoData from "./orientacaoData"

interface OrientacaoBarProps {
    tfg: Tfg
    redirect: (id: string) => void
}

export default function OrientacaoBar({ tfg, redirect }: OrientacaoBarProps) {
    return (
        <div style={{ width: "100%" }}>
            <OrientacaoData tfg={tfg} redirect={redirect} />
        </div>
    )
}
