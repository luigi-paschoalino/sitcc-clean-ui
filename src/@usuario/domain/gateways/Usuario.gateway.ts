import { AlterarSenhaUsecaseProps } from "../../application/AlterarSenha.usecase"
import { CriarProjetoUsecaseProps } from "../../application/CriarProjeto.usecase"
import { EditarPerfilProfessorUsecaseProps } from "../../application/EditarPerfilProfessor.usecase"
import { EditarProjetoUsecaseProps } from "../../application/EditarProjeto.usecase"
import { ExcluirProjetoUsecaseProps } from "../../application/ExcluirProjeto.usecase"

export interface CadastrarUsuarioProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: string
    numero: string
    codigo?: string
}

export interface AutenticarProps {
    email: string
    senha: string
}
export interface UsuarioHttpGateway {
    cadastrar(props: CadastrarUsuarioProps): Promise<any>
    buscar(id: string): Promise<any>
    logar(props: AutenticarProps): Promise<any>
    buscarProfs(): Promise<any[]>
    criarProjeto(props: CriarProjetoUsecaseProps): Promise<void>
    editarProjeto(props: EditarProjetoUsecaseProps): Promise<void>
    excluirProjeto(props: ExcluirProjetoUsecaseProps): Promise<void>
    editarPerfilProfessor(
        props: EditarPerfilProfessorUsecaseProps,
    ): Promise<void>
    buscarPorHashSenha(hash: string): Promise<any>
    recuperarSenha(email: string): Promise<void>
    alterarSenha(props: AlterarSenhaUsecaseProps): Promise<void>
}
