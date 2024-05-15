import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface ExcluirProjetoUsecaseProps {
    projetoId: string
}

export class ExcluirProjetoUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: ExcluirProjetoUsecaseProps): Promise<void> {
        await this.usuarioGateway.excluirProjeto(props)
    }
}
