import {
    BaixarTfgUsecaseProps,
    TfgHttpGateway,
} from "../domain/gateway/Tfg.gateway"

export class BaixarTfgUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: BaixarTfgUsecaseProps): Promise<any> {
        return await this.tfgHttpGateway.baixarTfg(props)
    }
}
