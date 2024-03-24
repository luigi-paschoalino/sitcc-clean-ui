import { Tfg } from "../entities/Tfg"

export interface CadastrarTccProps {
    orientador: string
    coorientador?: string
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    metodoPesquisa: string
    tecnicaPesquisa: string
    descricaoMetodologia: string
    resultadosEsperados: string
}

export interface FiltroProps {
    orientadorId?: string
    alunoId?: string
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
    tfgId: string
    professorId: string
    nota: number
}

export interface AvaliarOrientacaoProps {
    tfgId: string
    professorId: string
    status: boolean
    justificativa?: string
}

export interface TfgHttpGateway {
    cadastrar(props: CadastrarTccProps): Promise<void>
    buscar(id: string): Promise<any>
    listar(filtros?: FiltroProps): Promise<any[]>
    avaliarNotaParcial(props: AvaliarNotaParcialProps): Promise<void>
    avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void>
    cadastrarBanca(props: CadastrarBancaProps): Promise<void>
}
