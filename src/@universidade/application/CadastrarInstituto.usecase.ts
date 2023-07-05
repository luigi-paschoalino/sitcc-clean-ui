import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export interface CadastrarInstitutoUsecaseProps {
  nome: string
  universidadeId: string
}

export class CadastrarInstitutoUsecase {
  constructor(private universidadeGatway: UniversidadeHttpGateway) {}

  async execute(props: CadastrarInstitutoUsecaseProps): Promise<void> {
    return await this.universidadeGatway.cadastrarInstituto(props)
  }
}
