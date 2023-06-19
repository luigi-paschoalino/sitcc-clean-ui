import { UniversidadeProps } from "../../views/usuario/criarUsuario"
import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export class BuscarUniversidadeQuery {
  constructor(private readonly universidadeGateway: UniversidadeHttpGateway) {}

  async execute(id: string): Promise<UniversidadeProps> {
    const result = await this.universidadeGateway.buscar(id)

    return result.toJson()
  }
}
