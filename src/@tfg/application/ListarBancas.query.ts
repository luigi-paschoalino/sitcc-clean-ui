import { Banca } from "../domain/entities/Banca"
import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export class ListarBancasQuery {
    constructor(private tfgGateway: TfgHttpGateway) {}

    async execute(): Promise<Banca[]> {
        const bancas = await this.tfgGateway.listarBancas()
        return bancas.map(
            (banca) =>
                new Banca(
                    banca.professorId,
                    banca.segundoProfessorId,
                    banca.data,
                    banca.tfgId,
                    banca.tfgNome,
                    banca.notaApresentacaoProfessor,
                    banca.notaApresentacaoSegundoProfessor,
                    banca.notaTrabalhoProfessor,
                    banca.notaTrabalhoSegundoProfessor,
                ),
        )
    }
}
