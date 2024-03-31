import { HttpServiceImpl } from "../../infra/httpService"
import {
    AvaliarOrientacaoProps,
    AvaliarTfgProps,
    BaixarTfgUsecaseProps,
    CadastrarBancaProps,
    CadastrarTccProps,
    EnviarTfgUsecaseProps,
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
        await this.httpService.put(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/${
                props.tfgId
            }/${`nota-${props.tipoEntrega}`}`,
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

    async baixarTfg(props: BaixarTfgUsecaseProps): Promise<any> {
        return `${process.env.REACT_APP_BACKEND_URL}/tfg/${props.id}/download/${props.tipoEntrega}`
    }

    async enviarTfg(props: EnviarTfgUsecaseProps) {
        const formData = new FormData()
        formData.append("file", props.arquivo)
        await this.httpService.post(
            `${process.env.REACT_APP_BACKEND_URL}/tfg/${props.id}/${props.tipoEntrega}`,
            formData,
            true,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
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
