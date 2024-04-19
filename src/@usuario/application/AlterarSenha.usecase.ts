import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface AlterarSenhaUsecaseProps {
    id: string
    hashRecuperacaoSenha: string
    senha: string
    confirmarSenha: string
}

export class AlterarSenhaUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: AlterarSenhaUsecaseProps): Promise<void> {
        return await this.usuarioGateway.alterarSenha(props)
    }
}
