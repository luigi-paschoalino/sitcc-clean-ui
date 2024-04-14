import { BuscarCronogramaVigenteQueryProps } from "../../application/BuscarCronogramaVigente.query"
import { CriarCronogramaUsecaseProps } from "../../application/CriarCronograma.usecase"

export interface CursoHttpGateway {
    buscar(id: string): Promise<any>
    listar(): Promise<any[]>
    criarCronograma(props: CriarCronogramaUsecaseProps): Promise<void>
    buscarCronogramaVigente(
        props: BuscarCronogramaVigenteQueryProps,
    ): Promise<any>
}
