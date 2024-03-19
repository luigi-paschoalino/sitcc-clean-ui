import { HttpServiceImpl } from "../../infra/httpService"
import { Tfg } from "../domain/entities/Tcc"
import {
    AvaliarNotaParcialProps,
    AvaliarOrientacaoProps,
    CadastrarBancaProps,
    CadastrarTccProps,
    TfgHttpGateway,
} from "../domain/gateway/Tfg.gateway"

export class TfgHttpGatewayImpl implements TfgHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async cadastrar(props: CadastrarTccProps): Promise<void> {
        await this.httpService.post("http://localhost:3001/tfg", props, true)
    }

    async buscar(id: string): Promise<Tfg> {
        return await this.httpService.get(
            `http://localhost:3001/tfg/${id}`,
            true,
        )
    }

    async avaliarNotaParcial(props: AvaliarNotaParcialProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/tfg/nota-parcial",
            props,
            true,
        )
    }

    async avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void> {
        await this.httpService.patch(
            //rever await desnecessário
            `http://localhost:3001/tfg/avaliar/${props.tfgId}`,
            props,
            true,
        )
    }

    async cadastrarBanca(props: CadastrarBancaProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/tfg/banca",
            props,
            true,
        )
    }
}
