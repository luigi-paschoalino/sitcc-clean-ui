import { TccHttpGateway } from "../domain/gateway/Tcc.gateway"

export interface AvaliarNotaParcialProps {
  professorId: string
  tccId: string
  nota: number
}

export class AvaliarNotaParcialUsecase {
  constructor(private tccHttpGateway: TccHttpGateway) {}

  async execute(props: AvaliarNotaParcialProps): Promise<void> {
    return await this.tccHttpGateway.avaliarNotaParcial(props)
  }
}
