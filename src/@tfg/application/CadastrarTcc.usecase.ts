import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface CadastrarTccProps {
    orientador: string
    coorientador?: string
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    descricaoMetodologia: string
    tecnicaPesquisa: string
    metodoPesquisa: string
    resultadosEsperados: string
}

export class CadastrarTccUsecase {
    constructor(private tccGateway: TfgHttpGateway) {}

    async execute(props: CadastrarTccProps): Promise<void> {
        return await this.tccGateway.cadastrar(props)
    }
}
