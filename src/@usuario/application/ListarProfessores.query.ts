import {
    Professor,
    UsuarioHttpGateway,
} from "../domain/gateways/Usuario.gateway"

export class ListarProfessoresQuery {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(): Promise<Professor[]> {
        const result = await this.usuarioGateway.buscarProfs()
        return result
    }
}
