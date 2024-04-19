import { CadastrarBancaUsecaseProps } from "../../application/CadastrarBanca.usecase"

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

export interface AvaliarEntregaParcialTfgProps {
    tfgId: string
    nota: number
    tipoEntrega: "parcial"
}

export interface AvaliarEntregaFinalTfgProps {
    tfgId: string
    notaApresentacao: number
    notaTrabalho: number
    tipoEntrega: "final"
}

export interface AvaliarOrientacaoProps {
    tfgId: string
    status: boolean
    justificativa?: string
}

export interface BaixarTfgUsecaseProps {
    id: string
    tipoEntrega: "parcial" | "final"
}

export interface EnviarTfgUsecaseProps {
    id: string
    tipoEntrega: "parcial" | "final"
    arquivo: File
}

export interface TfgHttpGateway {
    cadastrar(props: CadastrarTccProps): Promise<void>
    buscar(id: string): Promise<any>
    listar(): Promise<any[]>
    avaliarNotaTfg(
        props: AvaliarEntregaParcialTfgProps | AvaliarEntregaFinalTfgProps,
    ): Promise<void>
    avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void>
    cadastrarBanca(props: CadastrarBancaUsecaseProps): Promise<void>
    baixarTfg(props: BaixarTfgUsecaseProps): Promise<any>
    enviarTfg(props: EnviarTfgUsecaseProps): Promise<any>
    listarBancas(): Promise<any[]>
}
