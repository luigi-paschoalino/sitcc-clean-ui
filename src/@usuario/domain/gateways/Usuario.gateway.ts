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
export interface UsuarioHttpGateway {
    cadastrar(props: CadastrarUsuarioProps): Promise<any>
    buscar(id: string): Promise<any>
    logar(props: AutenticarProps): Promise<any>
    buscarProfs(): Promise<any[]>
}
