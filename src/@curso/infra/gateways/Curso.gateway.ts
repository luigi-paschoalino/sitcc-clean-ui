import { HttpServiceImpl } from "../../../infra/httpService"
import { BuscarCronogramaVigenteQueryProps } from "../../application/BuscarCronogramaVigente.query"
import { CriarCronogramaUsecaseProps } from "../../application/CriarCronograma.usecase"
import { CursoHttpGateway } from "../../domain/gateways/Curso.gateway"

export class CursoHttpGatewayImpl implements CursoHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async buscar(id: string): Promise<any> {
        const result = await this.httpService.get(
            `http://localhost:3001/cursos/${id}`,
            true,
        )
        return result.data
    }

    async listar(): Promise<any[]> {
        const result = await this.httpService.get(
            `http://localhost:3001/cursos`,
            true,
        )
        return result.data
    }

    async criarCronograma(props: CriarCronogramaUsecaseProps): Promise<void> {
        await this.httpService.put(
            `http://localhost:3001/cursos/${props.cursoId}/cronograma`,
            {
                ano: props.ano,
                semestre: props.semestre,
            },
            true,
        )
    }

    async buscarCronogramaVigente(
        props: BuscarCronogramaVigenteQueryProps,
    ): Promise<any> {
        const result = await this.httpService.get(
            `http://localhost:3001/cursos/${props.cursoId}/cronogramas/vigente`,
            true,
        )
        return result.data
    }
}
