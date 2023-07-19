import { HttpServiceImpl } from "../../../infra/httpService"
import { Usuario } from "../../domain/entities/Usuario"
import {
    AutenticarProps,
    CadastrarUsuarioProps,
    UsuarioHttpGateway,
} from "../../domain/gateways/Usuario.gateway"

export interface LoginResponse {}

export class UsuarioHttpGatewayImpl implements UsuarioHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async cadastrar(props: CadastrarUsuarioProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/usuarios",
            props,
            false,
        )
    }

    async buscar(id: string): Promise<Usuario> {
        return await this.httpService.get(
            `http://localhost:3001/usuarios/${id}`,
            true,
        )
    }

    async logar(props: AutenticarProps): Promise<any> {
        return await this.httpService.post(
            "http://localhost:3001/login",
            props,
            false,
        )
    }
}
