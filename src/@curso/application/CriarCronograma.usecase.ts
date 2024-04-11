import { CursoHttpGateway } from "../domain/gateways/Curso.gateway"

export interface CriarCronogramaUsecaseProps {
    cursoId: string
    ano: number
    semestre: "PRIMEIRO" | "SEGUNDO"
}

export class CriarCronogramaUsecase {
    constructor(private cursoGateway: CursoHttpGateway) {}

    async execute(props: CriarCronogramaUsecaseProps) {
        return await this.cursoGateway.criarCronograma(props)
    }
}
