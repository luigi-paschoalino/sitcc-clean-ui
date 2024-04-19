import { CursoHttpGateway } from "../domain/gateways/Curso.gateway"

export interface AtualizarAtividadeCronogramaUsecaseProps {
    cursoId: string
    cronogramaId: string
    atividadeId: string
    titulo: string
    descricao: string
    data: Date
}

export class AtualizarAtividadeCronogramaUsecase {
    constructor(private cursoGateway: CursoHttpGateway) {}

    async execute(props: AtualizarAtividadeCronogramaUsecaseProps) {
        return await this.cursoGateway.atualizarAtividadeCronograma(props)
    }
}
