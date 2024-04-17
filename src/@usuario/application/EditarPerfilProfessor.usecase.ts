import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface EditarPerfilProfessorUsecaseProps {
    descricao?: string
    link?: string
    areasAtuacao?: string[]
}

export class EditarPerfilProfessorUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: EditarPerfilProfessorUsecaseProps): Promise<void> {
        await this.usuarioGateway.editarPerfilProfessor(props)
    }
}
