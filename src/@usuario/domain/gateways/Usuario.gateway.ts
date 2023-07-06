import { TIPO_USUARIO, Usuario } from "../entities/Usuario"

export interface CadastrarUsuarioProps {
  nome: string
  curso: string
  email: string
  senha: string
  tipo: string
  numero: string
}

export interface AutenticarProps {
  email: string
  senha: string
}

export interface UsuarioHttpGateway {
  cadastrar(props: CadastrarUsuarioProps): Promise<void>
  buscar(id: string): Promise<Usuario>
  logar(props: AutenticarProps): Promise<void>
}
