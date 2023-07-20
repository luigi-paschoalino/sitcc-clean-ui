import { HttpServiceImpl } from "../../infra/httpService"
import { AuthHttpGateway } from "../domain/gateway/Auth.gateway"

export class AuthHttpGatewayImpl implements AuthHttpGateway {
  constructor(private readonly httpService: HttpServiceImpl) {}

  async validar(token: string): Promise<any> {
    await this.httpService.post("http://localhost:3001/auth/validate", token)
  }
}
