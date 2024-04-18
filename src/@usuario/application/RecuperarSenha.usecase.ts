import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export class RecuperarSenhaUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(email: string): Promise<void> {
        return await this.usuarioGateway.recuperarSenha(email)
    }
}
