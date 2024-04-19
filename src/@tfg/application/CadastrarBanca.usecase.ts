import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface CadastrarBancaUsecaseProps {
    usuarioId: string
    professorId: string
    segundoProfessorId: string
    data: Date
    tfgId: string
}

export class CadastrarBancaUseCase {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(props: CadastrarBancaUsecaseProps): Promise<void> {
        return await this.tfgGateway.cadastrarBanca(props)
    }
}
