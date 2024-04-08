import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface AvaliarNotaParcialTfgUsecaseProps {
    tfgId: string
    nota: number
    tipoEntrega: "parcial"
}

export class AvaliarNotaParcialTfgUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: AvaliarNotaParcialTfgUsecaseProps): Promise<void> {
        return await this.tfgHttpGateway.avaliarNotaTfg(props)
    }
}
