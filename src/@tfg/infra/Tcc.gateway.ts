import { HttpServiceImpl } from "../../infra/httpService"
import { Tcc } from "../domain/entities/Tcc"
import {
  AvaliarNotaParcialProps,
  CadastrarBancaProps,
  CadastrarTccProps,
  TccHttpGateway,
} from "../domain/gateway/Tcc.gateway"

export class TccHttpGatewayImpl implements TccHttpGateway {
  constructor(private readonly httpService: HttpServiceImpl) {}

  async cadastrar(props: CadastrarTccProps): Promise<void> {
    await this.httpService.post("http://localhost:3001/tcc", props)
  }

  async buscar(id: string): Promise<Tcc> {
    return await this.httpService.get(`http://localhost:3001/tcc/${id}`)
  }

  async avaliarNotaParcial(props: AvaliarNotaParcialProps): Promise<void> {
    await this.httpService.post("http://localhost:3001/tcc/notaParcial", props)
  }

  async cadastrarBanca(props: CadastrarBancaProps): Promise<void> {
    await this.httpService.post("http://localhost:3001/tcc/banca", props)
  }
}
