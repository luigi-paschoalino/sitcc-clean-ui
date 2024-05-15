import { HttpServiceImpl } from "../../../infra/httpService"
import { GerarCodigoProfessorUsecaseProps } from "../../application/GerarCodigoProfessor.usecase"
import { CodigoProfessorGateway } from "../../domain/gateways/CodigoProfessor.gateway"

export class CodigoProfessorHttpGatewayImpl implements CodigoProfessorGateway {
    constructor(private httpService: HttpServiceImpl) {}

    async listarCodigos(): Promise<any[]> {
        const result = await this.httpService.get(
            "http://localhost:3001/codigo",
            true,
        )
        return result.data
    }

    async gerarCodigo(props: GerarCodigoProfessorUsecaseProps): Promise<void> {
        await this.httpService.post("http://localhost:3001/codigo", props, true)
    }
}
