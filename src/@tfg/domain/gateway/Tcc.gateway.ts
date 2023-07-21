import { Tcc } from "../entities/Tcc"

export interface CadastrarTccProps {
    aluno: string
    orientador: string
    titulo: string
    palavras_chave: string[]
    introducao: string
    objetivos: string
    bibliografia: string
    metodologia: string
    resultados: string
}

export interface CadastrarBancaProps {
    id: string
    id_professor: string
    dia_hora: string
    nota_final: number
    nota_apresentacao: number
    nota_trabalho: number
}

export interface AvaliarNotaParcialProps {
    tccId: string
    professorId: string
    nota: number
}

export interface AvaliarOrientacaoProps {
    tccId: string
    professorId: string
    status: boolean
    justificativa?: string
}

export interface TccHttpGateway {
    cadastrar(props: CadastrarTccProps): Promise<void>
    buscar(id: string): Promise<Tcc>
    avaliarNotaParcial(props: AvaliarNotaParcialProps): Promise<void>
    avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void>
    cadastrarBanca(props: CadastrarBancaProps): Promise<void>
}
