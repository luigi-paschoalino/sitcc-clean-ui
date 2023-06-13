import { TIPO_USUARIO, Usuario } from "../entities/Usuario"

export interface CadastrarUsuarioProps {
  nome: string
  curso: string
  email: string
  senha: string
  tipo: TIPO_USUARIO
  numero: string
}

export interface UsuarioHttpGateway {
  cadastrar(props: CadastrarUsuarioProps): Promise<void>
  buscar(id: string): Promise<Usuario>
}
