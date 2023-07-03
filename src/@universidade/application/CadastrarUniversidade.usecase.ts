import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export interface CadastrarUniversidadeUsecaseProps {
  nome: string
}

export class CadastrarUniversidadeUsecase {
  constructor(private universidadeGatway: UniversidadeHttpGateway) {}

  async execute(props: CadastrarUniversidadeUsecaseProps): Promise<void> {
    return await this.universidadeGatway.cadastrar(props)
  }
}
