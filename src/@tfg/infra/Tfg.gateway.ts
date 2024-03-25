import { HttpServiceImpl } from "../../infra/httpService"
import {
    AvaliarTfgProps,
    AvaliarOrientacaoProps,
    CadastrarBancaProps,
    CadastrarTccProps,
    TfgHttpGateway,
} from "../domain/gateway/Tfg.gateway"

export class TfgHttpGatewayImpl implements TfgHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async cadastrar(props: CadastrarTccProps): Promise<void> {
        await this.httpService.post(
            `${process.env.REACT_APP_BACKEND_URL}/tfg`,
            props,
            true,
        )
    }

    async buscar(id: string): Promise<any> {
        const response = await this.httpService.get(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/${id}`,
            true,
        )
        return response.data
    }

    async listar(): Promise<any[]> {
        const response = await this.httpService.get(
            `${process.env.REACT_APP_BACKEND_URL}/tfg`,
            true,
        )
        return response.data
    }

    async avaliarNotaTfg(props: AvaliarTfgProps): Promise<void> {
        await this.httpService.post(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/${
                props.tipoEntrega === "PARCIAL" ? "nota-parcial" : "nota-final"
            }`,
            props,
            true,
        )
    }

    async avaliarOrientacao(props: AvaliarOrientacaoProps): Promise<void> {
        await this.httpService.patch(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/avaliar/${props.tfgId}`,
            props,
            true,
        )
    }

    async cadastrarBanca(props: CadastrarBancaProps): Promise<void> {
        await this.httpService.post(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/banca`,
            props,
            true,
        )
    }
}
