import { UniversidadeHttpGateway } from "../domain/gateways/Universidade.gateway"

export interface CadastrarCursoUsecaseProps {
  nome: string
  codigo: string
  institutoId: string
}

export class CadastrarCursoUsecase {
  constructor(private universidadeGatway: UniversidadeHttpGateway) {}

  async execute(props: CadastrarCursoUsecaseProps): Promise<void> {
    return await this.universidadeGatway.cadastrarCurso(props)
  }
}
