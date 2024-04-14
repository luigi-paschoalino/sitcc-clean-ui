import { Usuario } from "../domain/entities/Usuario"
import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export class ListarProfessoresQuery {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(): Promise<Usuario[]> {
        const result = await this.usuarioGateway.buscarProfs()

        return result.map((p) => {
            return new Usuario(
                p.id,
                p.nome,
                p.curso,
                p.email,
                p.tipo,
                p.numero,
                p.matricula,
                p.perfilProfessor,
            )
        })
    }
}
