import { Tfg } from "../domain/entities/Tfg"
import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export class BuscarTfgQuery {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(id: string): Promise<Tfg> {
        const tfg = await this.tfgGateway.buscar(id)
        return new Tfg(
            tfg.id,
            tfg.aluno,
            tfg.orientador,
            tfg.titulo,
            tfg.palavrasChave,
            tfg.introducao,
            tfg.objetivos,
            tfg.bibliografia,
            tfg.metodoPesquisa,
            tfg.tecnicaPesquisa,
            tfg.descricaoMetodologia,
            tfg.resultadosEsperados,
            tfg.status,
            tfg.coorientador,
        )
    }
}
