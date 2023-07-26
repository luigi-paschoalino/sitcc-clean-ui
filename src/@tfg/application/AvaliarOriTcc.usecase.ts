import { TccHttpGateway } from "../domain/gateway/Tcc.gateway"

export interface AvaliarOrientacaoProps {
    professorId: string
    tccId: string
    status: boolean
    justificavita?: string
}

export class AvaliarOrientacaoUsecase {
    constructor(private tccHttpGateway: TccHttpGateway) {}

    async execute(props: AvaliarOrientacaoProps): Promise<void> {
        return await this.tccHttpGateway.avaliarOrientacao(props)
    }
}
