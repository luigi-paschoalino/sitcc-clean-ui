import { TccHttpGateway } from "../domain/gateway/Tcc.gateway"

export interface CadastrarTccProps {
    orientador: string
    coorientador?: string
}

export class CadastrarTccUsecase {
    constructor(private tccGateway: TccHttpGateway) {}

    async execute(props: CadastrarTccProps): Promise<void> {
        return await this.tccGateway.cadastrar(props)
    }
}
