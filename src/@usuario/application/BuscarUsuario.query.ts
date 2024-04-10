import { Usuario } from "../domain/entities/Usuario"
import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export class BuscarUsuarioQuery {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(id: string): Promise<Usuario> {
        const result = await this.usuarioGateway.buscar(id)
        return new Usuario(
            result.id,
            result.nome,
            result.curso,
            result.email,
            result.tipo,
            result.numero,
            result.matricula,
        )
    }
}
