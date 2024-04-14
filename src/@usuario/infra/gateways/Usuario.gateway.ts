import { HttpServiceImpl } from "../../../infra/httpService"
import {
    AutenticarProps,
    CadastrarUsuarioProps,
    UsuarioHttpGateway,
} from "../../domain/gateways/Usuario.gateway"

export interface LoginResponse {}

export class UsuarioHttpGatewayImpl implements UsuarioHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async cadastrar(props: CadastrarUsuarioProps): Promise<any> {
        const cadastro = await this.httpService.post(
            "http://localhost:3001/usuarios",
            props,
            false,
        )
        return cadastro.data
    }

    async buscar(id: string): Promise<any> {
        const result = await this.httpService.get(
            `http://localhost:3001/usuarios/${id}`,
            true,
        )
        return result.data
    }

    async logar(props: AutenticarProps): Promise<any> {
        return await this.httpService.post(
            "http://localhost:3001/login",
            props,
            false,
        )
    }

    async buscarProfs(): Promise<any[]> {
        const result = await this.httpService.get(
            "http://localhost:3001/usuarios/professores",
            true,
        )
        return result.data
    }
}
