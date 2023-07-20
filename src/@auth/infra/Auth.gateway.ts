import { HttpServiceImpl } from "../../infra/httpService"
import { AuthHttpGateway } from "../domain/gateway/Auth.gateway"

export class AuthHttpGatewayImpl implements AuthHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async validar(token: string): Promise<any> {
        return await this.httpService.post(
            "http://localhost:3001/login/validate",
            { token },
            false,
        )
    }
}
