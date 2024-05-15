import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface EditarProjetoUsecaseProps {
    projetoId: string
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export class EditarProjetoUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: EditarProjetoUsecaseProps): Promise<void> {
        await this.usuarioGateway.editarProjeto(props)
    }
}
