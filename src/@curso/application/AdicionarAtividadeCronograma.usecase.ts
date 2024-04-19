import { CursoHttpGateway } from "../domain/gateways/Curso.gateway"

export interface AdicionarAtividadeCronogramaUsecaseProps {
    cursoId: string
    cronogramaId: string
    titulo: string
    descricao: string
    data: Date
}

export class AdicionarAtividadeCronogramaUsecase {
    constructor(private cursoGateway: CursoHttpGateway) {}

    async execute(props: AdicionarAtividadeCronogramaUsecaseProps) {
        return await this.cursoGateway.adicionarAtividadeCronograma(props)
    }
}
