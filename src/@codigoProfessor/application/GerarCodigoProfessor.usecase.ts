import { CodigoProfessorGateway } from "../domain/gateways/CodigoProfessor.gateway"

export interface GerarCodigoProfessorUsecaseProps {
    professorEmail: string
}

export class GerarCodigoProfessorUsecase {
    constructor(private codigoProfessorGateway: CodigoProfessorGateway) {}

    async execute(props: GerarCodigoProfessorUsecaseProps) {
        await this.codigoProfessorGateway.gerarCodigo(props)
    }
}
