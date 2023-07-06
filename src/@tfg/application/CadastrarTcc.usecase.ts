import { TccHttpGateway } from "../domain/gateway/Tcc.gateway"

export interface CadastrarTccProps {
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

export class CadastrarTccUsecase {
  constructor(private tccGateway: TccHttpGateway) {}

  async execute(props: CadastrarTccProps): Promise<void> {
    return await this.tccGateway.cadastrar(props)
  }
}
