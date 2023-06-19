import { UniversidadeProps } from "../../views/usuario/criarUsuario"
import { Universidade } from "../domain/entities/Universidade"
import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export class ListarUniversidadesQuery {
  constructor(private readonly universidadeGateway: UniversidadeHttpGateway) {}

  async execute(): Promise<UniversidadeProps[]> {
    const result = await this.universidadeGateway.listar()

    return result.map((universidade: Universidade) => universidade.toJson())
  }
}
