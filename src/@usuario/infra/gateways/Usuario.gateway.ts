import { HttpServiceImpl } from "../../../infra/httpService"
import { Usuario } from "../../domain/entities/Usuario"
import {
  AutenticarProps,
  CadastrarUsuarioProps,
  UsuarioHttpGateway,
} from "../../domain/gateways/Usuario.gateway"

export class UsuarioHttpGatewayImpl implements UsuarioHttpGateway {
  constructor(private readonly httpService: HttpServiceImpl) {}

  async cadastrar(props: CadastrarUsuarioProps): Promise<void> {
    await this.httpService.post("http://localhost:3001/usuarios", props)
  }

  async buscar(id: string): Promise<Usuario> {
    return await this.httpService.get(`http://localhost:3001/usuarios/${id}`)
  }

  async logar(props: AutenticarProps): Promise<void> {
    await this.httpService.post("http://localhost:3001/usuarios/login", props)
  }
}
