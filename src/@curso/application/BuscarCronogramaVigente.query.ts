import { Cronograma } from "../domain/entities/Cronograma"
import { CursoHttpGateway } from "../domain/gateways/Curso.gateway"

export interface BuscarCronogramaVigenteQueryProps {
    cursoId: string
}

export class BuscarCronogramaVigenteQuery {
    constructor(private cursoGateway: CursoHttpGateway) {}

    async execute(props: BuscarCronogramaVigenteQueryProps) {
        const result = await this.cursoGateway.buscarCronogramaVigente(props)
        return new Cronograma(
            result.id,
            result.ano,
            result.semestre,
            result.atividades,
        )
    }
}
