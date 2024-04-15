import { GerarCodigoProfessorUsecaseProps } from "../../application/GerarCodigoProfessor.usecase"

export interface CodigoProfessorGateway {
    listarCodigos(): Promise<any[]>
    gerarCodigo(props: GerarCodigoProfessorUsecaseProps): Promise<void>
}
