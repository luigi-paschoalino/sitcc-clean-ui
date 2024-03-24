import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface CadastrarBancaProps {
    id: string
    id_professor: string
    dia_hora: string
    nota_final: number
    nota_apresentacao: number
    nota_trabalho: number
}

export class CadastrarBancaUseCase {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(props: CadastrarBancaProps): Promise<void> {
        return await this.tfgGateway.cadastrarBanca(props)
    }
}
