import { Universidade } from "../entities/Universidade"

export interface UniversidadeHttpGateway {
  buscar(id: string): Promise<Universidade>
  listar(): Promise<Universidade[]>
}
