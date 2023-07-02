import { Universidade } from "../entities/Universidade"

export interface CadastrarUniversidadeProps {
  nome: string
}

export interface UniversidadeHttpGateway {
  buscar(id: string): Promise<Universidade>
  listar(): Promise<Universidade[]>
  cadastrar(props: CadastrarUniversidadeProps): Promise<void>
}
