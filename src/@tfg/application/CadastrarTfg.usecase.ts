import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface CadastrarTfgProps {
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

export class CadastrarTfgUsecase {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(props: CadastrarTfgProps): Promise<void> {
        return await this.tfgGateway.cadastrar(props)
    }
}
