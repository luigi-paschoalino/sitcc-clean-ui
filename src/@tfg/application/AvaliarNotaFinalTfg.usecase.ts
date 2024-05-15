import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface AvaliarEntregaFinalTfgUsecaseProps {
    tfgId: string
    notaApresentacao: number
    notaTrabalho: number
    tipoEntrega: "final"
}

export class AvaliarEntregaFinalTfgUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: AvaliarEntregaFinalTfgUsecaseProps): Promise<void> {
        return await this.tfgHttpGateway.avaliarNotaTfg(props)
    }
}
