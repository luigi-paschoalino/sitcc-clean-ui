import { AuthHttpGateway } from "../domain/gateway/Auth.gateway"

export class AuthRotaUsecase {
  constructor(private authHttpGateway: AuthHttpGateway) {}

  async execute(token: string): Promise<any> {
    return await this.authHttpGateway.validar(token)
  }
}
