import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface CadastrarTccProps {
    orientador: string
    coorientador?: string
}

export class CadastrarTccUsecase {
    constructor(private tccGateway: TfgHttpGateway) {}

    async execute(props: CadastrarTccProps): Promise<void> {
        return await this.tccGateway.cadastrar(props)
    }
}
