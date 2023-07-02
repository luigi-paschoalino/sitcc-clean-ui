import { isReturnStatement } from "typescript"
import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export interface CadastrarUniversidadeProps {
  nome: string
}

export class CadastrarUniversidade {
  constructor(private universidadeGatway: UniversidadeHttpGateway) {}

  async execute(props: CadastrarUniversidadeProps): Promise<void> {
    return await this.universidadeGatway.cadastrar(props)
  }
}
