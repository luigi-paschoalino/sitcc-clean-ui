import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"
import { AvaliarOrientacaoProps } from "../domain/gateway/Tfg.gateway"

export class AvaliarOrientacaoUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: AvaliarOrientacaoProps): Promise<void> {
        return await this.tfgHttpGateway.avaliarOrientacao(props)
    }
}
