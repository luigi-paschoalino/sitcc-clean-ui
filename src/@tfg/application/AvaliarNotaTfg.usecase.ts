import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface AvaliarNotaTfgUsecaseProps {
    tfgId: string
    nota: number
    tipoEntrega: "PARCIAL" | "FINAL"
}

export class AvaliarNotaTfgUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: AvaliarNotaTfgUsecaseProps): Promise<void> {
        return await this.tfgHttpGateway.avaliarNotaTfg(props)
    }
}
