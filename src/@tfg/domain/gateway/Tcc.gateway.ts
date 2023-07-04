import { Tcc } from "../entities/Tcc"

export interface CadastrarTccProps {
  id: string
  aluno: string
  orientador: string
  titulo: string
  palavras_chave: string[]
  introducao: string
  objetivos: string
  bibliografia: string
  metodologia: string
  resultados: string
}

export interface AvaliarNotaParcialProps {
  tccId: string
  professorId: string
  nota: number
}

export interface TccHttpGateway {
  cadastrar(props: CadastrarTccProps): Promise<void>
  buscar(id: string): Promise<Tcc>
  avaliarNotaParcial(props: AvaliarNotaParcialProps): Promise<void>
}
