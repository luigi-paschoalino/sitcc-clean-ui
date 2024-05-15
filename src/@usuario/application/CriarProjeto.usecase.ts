import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface CriarProjetoUsecaseProps {
    titulo: string
    descricao: string
    preRequisitos: string
}

export class CriarProjetoUsecase {
    constructor(private readonly usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: CriarProjetoUsecaseProps): Promise<void> {
        await this.usuarioGateway.criarProjeto(props)
    }
}
