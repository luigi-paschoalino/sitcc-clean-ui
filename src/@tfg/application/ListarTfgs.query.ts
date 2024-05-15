import { Tfg } from "../domain/entities/Tfg"
import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export class ListarTfgsQuery {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(): Promise<Tfg[]> {
        const tfgs = await this.tfgGateway.listar()
        return tfgs.map(
            (tfg) =>
                new Tfg(
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
                    tfg.banca,
                ),
        )
    }
}
