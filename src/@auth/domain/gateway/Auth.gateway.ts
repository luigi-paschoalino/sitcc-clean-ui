export interface AuthHttpGateway {
  validar(token: string): Promise<any>
}
