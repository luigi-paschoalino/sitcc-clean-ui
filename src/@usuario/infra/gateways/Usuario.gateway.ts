import { HttpServiceImpl } from "../../../infra/httpService"
import { AlterarSenhaUsecaseProps } from "../../application/AlterarSenha.usecase"
import { CriarProjetoUsecaseProps } from "../../application/CriarProjeto.usecase"
import { EditarPerfilProfessorUsecaseProps } from "../../application/EditarPerfilProfessor.usecase"
import { EditarProjetoUsecaseProps } from "../../application/EditarProjeto.usecase"
import { ExcluirProjetoUsecaseProps } from "../../application/ExcluirProjeto.usecase"
import {
    AutenticarProps,
    CadastrarUsuarioProps,
    UsuarioHttpGateway,
} from "../../domain/gateways/Usuario.gateway"

export interface LoginResponse {}

export class UsuarioHttpGatewayImpl implements UsuarioHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async cadastrar(props: CadastrarUsuarioProps): Promise<any> {
        const cadastro = await this.httpService.post(
            "http://localhost:3001/usuarios",
            props,
            false,
        )
        return cadastro.data
    }

    async buscar(id: string): Promise<any> {
        const result = await this.httpService.get(
            `http://localhost:3001/usuarios/${id}`,
            true,
        )
        return result.data
    }

    async logar(props: AutenticarProps): Promise<any> {
        return await this.httpService.post(
            "http://localhost:3001/login",
            props,
            false,
        )
    }

    async buscarProfs(): Promise<any[]> {
        const result = await this.httpService.get(
            "http://localhost:3001/usuarios/professores",
            true,
        )
        return result.data
    }

    async criarProjeto(props: CriarProjetoUsecaseProps): Promise<void> {
        return await this.httpService.put(
            "http://localhost:3001/usuarios/perfil-professor/projetos",
            props,
            true,
        )
    }

    async editarProjeto(props: EditarProjetoUsecaseProps): Promise<void> {
        return await this.httpService.patch(
            `http://localhost:3001/usuarios/perfil-professor/projetos/${props.projetoId}`,
            props,
            true,
        )
    }

    async excluirProjeto(props: ExcluirProjetoUsecaseProps): Promise<void> {
        return await this.httpService.delete(
            `http://localhost:3001/usuarios/perfil-professor/projetos/${props.projetoId}`,
            true,
        )
    }

    async editarPerfilProfessor(
        props: EditarPerfilProfessorUsecaseProps,
    ): Promise<void> {
        return await this.httpService.patch(
            "http://localhost:3001/usuarios/perfil-professor",
            props,
            true,
        )
    }

    async buscarPorHashSenha(hash: string): Promise<any> {
        const result = await this.httpService.get(
            `http://localhost:3001/usuarios/recuperar/${hash}`,
            false,
        )
        return result.data
    }

    async recuperarSenha(email: string): Promise<void> {
        return await this.httpService.patch(
            "http://localhost:3001/usuarios/recuperar",
            { email },
            false,
        )
    }

    async alterarSenha(props: AlterarSenhaUsecaseProps): Promise<void> {
        return await this.httpService.patch(
            `http://localhost:3001/usuarios/alterar-senha/${props.hashRecuperacaoSenha}`,
            { ...props },
            true,
        )
    }
}
