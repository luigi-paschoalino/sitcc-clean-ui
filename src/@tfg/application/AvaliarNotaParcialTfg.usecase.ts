import { TfgHttpGateway } from "../domain/gateway/Tfg.gateway"

export interface AvaliarNotaParcialProps {
    professorId: string
    tfgId: string
    nota: number
}

export class AvaliarNotaParcialUsecase {
    constructor(private tccHttpGateway: TfgHttpGateway) {}

    async execute(props: AvaliarNotaParcialProps): Promise<void> {
        return await this.tccHttpGateway.avaliarNotaParcial(props)
    }
}
