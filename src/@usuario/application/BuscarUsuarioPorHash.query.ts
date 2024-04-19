import { Usuario } from "../domain/entities/Usuario"
import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export class BuscarUsuarioPorHashQuery {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(hash: string): Promise<Usuario> {
        const result = await this.usuarioGateway.buscarPorHashSenha(hash)

        return new Usuario(
            result.id,
            result.nome,
            result.curso,
            result.email,
            result.tipo,
            result.numero,
            result.matricula,
            result.perfilProfessor,
        )
    }
}
