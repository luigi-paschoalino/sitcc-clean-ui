import { TIPO_USUARIO } from "../domain/entities/Usuario"
import {
  AutenticarProps,
  UsuarioHttpGateway,
} from "../domain/gateways/Usuario.gateway"

export class AutenticarUsecase {
  constructor(private usuarioGateway: UsuarioHttpGateway) {}

  async execute(props: AutenticarProps): Promise<void> {
    return await this.usuarioGateway.logar(props)
  }
}
