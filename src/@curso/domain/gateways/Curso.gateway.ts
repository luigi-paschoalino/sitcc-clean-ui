import { AdicionarAtividadeCronogramaUsecaseProps } from "../../application/AdicionarAtividadeCronograma.usecase"
import { AtualizarAtividadeCronogramaUsecaseProps } from "../../application/AtualizarAtividadeCronograma.usecase"
import { BuscarCronogramaVigenteQueryProps } from "../../application/BuscarCronogramaVigente.query"
import { CriarCronogramaUsecaseProps } from "../../application/CriarCronograma.usecase"

export interface CursoHttpGateway {
    buscar(id: string): Promise<any>
    listar(): Promise<any[]>
    criarCronograma(props: CriarCronogramaUsecaseProps): Promise<void>
    buscarCronogramaVigente(
        props: BuscarCronogramaVigenteQueryProps,
    ): Promise<any>
    adicionarAtividadeCronograma(
        props: AdicionarAtividadeCronogramaUsecaseProps,
    ): Promise<void>
    atualizarAtividadeCronograma(
        props: AtualizarAtividadeCronogramaUsecaseProps,
    ): Promise<void>
}
