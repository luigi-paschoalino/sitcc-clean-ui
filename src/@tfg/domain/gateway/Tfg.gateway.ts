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

export interface AvaliarTfgProps {
    tfgId: string
    nota: number
    tipoEntrega: "PARCIAL" | "FINAL"
}

export interface AvaliarOrientacaoProps {
    tfgId: string
    status: boolean
    justificativa?: string
}

export interface TfgHttpGateway {
    cadastrar(props: CadastrarTccProps): Promise<void>
    buscar(id: string): Promise<any>
    listar(filtros?: FiltroProps): Promise<any[]>
    avaliarNotaTfg(props: AvaliarTfgProps): Promise<void>
    avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void>
    cadastrarBanca(props: CadastrarBancaProps): Promise<void>
}
