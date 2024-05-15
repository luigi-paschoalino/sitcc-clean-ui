import { CodigoProfessor } from "../domain/entities/CodigoProfessor"
import { CodigoProfessorGateway } from "../domain/gateways/CodigoProfessor.gateway"

export class ListarCodigosProfessorQuery {
    constructor(private codigoProfessorGateway: CodigoProfessorGateway) {}

    async execute() {
        const result = await this.codigoProfessorGateway.listarCodigos()

        return result.map((codigo) => {
            return new CodigoProfessor(
                codigo.id,
                codigo.codigo,
                codigo.email,
                codigo.disponivel,
            )
        })
    }
}
