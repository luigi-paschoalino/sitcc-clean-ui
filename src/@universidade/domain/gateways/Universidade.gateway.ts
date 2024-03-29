import { Universidade } from "../entities/Universidade"

export interface CadastrarUniversidadeProps {
  nome: string
}

export interface CadastrarInstitutoProps {
  nome: string
  universidadeId: string
}

export interface CadastrarCursoProps {
  nome: string
  codigo: string
  institutoId: string
}

export interface UniversidadeHttpGateway {
  buscar(id: string): Promise<Universidade>
  listar(): Promise<Universidade[]>
  cadastrar(props: CadastrarUniversidadeProps): Promise<void>
  cadastrarInstituto(props: CadastrarInstitutoProps): Promise<void>
  cadastrarCurso(props: CadastrarCursoProps): Promise<void>
}
