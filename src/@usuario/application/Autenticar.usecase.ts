import {
    AutenticarProps,
    UsuarioHttpGateway,
} from "../domain/gateways/Usuario.gateway"

export class AutenticarUsecase {
    constructor(private usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: AutenticarProps): Promise<any> {
        return await this.usuarioGateway.logar(props)
    }
}
