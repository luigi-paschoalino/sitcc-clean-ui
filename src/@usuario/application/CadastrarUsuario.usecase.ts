import { UsuarioHttpGateway } from "../domain/gateways/Usuario.gateway"

export interface CadastrarUsuarioProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: string
    numero: string
    codigo?: string
}

export class CadastrarUsuarioUsecase {
    constructor(private usuarioGateway: UsuarioHttpGateway) {}

    async execute(props: CadastrarUsuarioProps): Promise<any> {
        return await this.usuarioGateway.cadastrar(props)
    }
}
