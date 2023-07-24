import { TIPO_USUARIO, Usuario } from "../entities/Usuario"

export interface CadastrarUsuarioProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: string
    numero: string
    codigo?: string
}

export interface AutenticarProps {
    email: string
    senha: string
}
export interface Professor {
    id: string
    nome: string
}

export interface UsuarioHttpGateway {
    cadastrar(props: CadastrarUsuarioProps): Promise<void>
    buscar(id: string): Promise<Usuario>
    logar(props: AutenticarProps): Promise<any>
    buscarProfs(): Promise<Professor[]>
}
