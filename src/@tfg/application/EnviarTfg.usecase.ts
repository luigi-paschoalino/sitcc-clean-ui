import {
    EnviarTfgUsecaseProps,
    TfgHttpGateway,
} from "../domain/gateway/Tfg.gateway"

export class EnviarTfgUsecase {
    constructor(private tfgHttpGateway: TfgHttpGateway) {}

    async execute(props: EnviarTfgUsecaseProps): Promise<any> {
        return await this.tfgHttpGateway.enviarTfg(props)
    }
}
