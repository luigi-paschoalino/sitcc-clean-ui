import { HttpServiceImpl } from "../../../infra/httpService"
import { Curso } from "../../domain/entities/Curso"
import { Instituto } from "../../domain/entities/Instituto"
import { Universidade } from "../../domain/entities/Universidade"
import {
    CadastrarCursoProps,
    CadastrarInstitutoProps,
    CadastrarUniversidadeProps,
    UniversidadeHttpGateway,
} from "../../domain/gateways/Universidade.gateway"

export class UniversidadeHttpGatewayImpl implements UniversidadeHttpGateway {
    constructor(private readonly httpService: HttpServiceImpl) {}

    async buscar(id: string): Promise<Universidade> {
        const result = await this.httpService.get(
            `http://localhost:3001/universidades/${id}`,
            true,
        )

        const institutos: Instituto[] = result.data.institutos.map(
            (instituto) =>
                new Instituto(
                    instituto.id,
                    instituto.nome,
                    instituto.cursos.map(
                        (c) => new Curso(c.id, c.nome, c.codigo),
                    ),
                ),
        )

        return new Universidade(result.data.id, result.data.nome, institutos)
    }

    async listar(): Promise<Universidade[]> {
        const result = await this.httpService.get(
            `http://localhost:3001/universidades`,
            true,
        )
        const universidades: Universidade[] = result.data.map(
            (universidade) => {
                const institutos: Instituto[] = universidade.institutos.map(
                    (instituto) =>
                        new Instituto(
                            instituto.id,
                            instituto.nome,
                            instituto.cursos.map(
                                (c) => new Curso(c.id, c.nome, c.codigo),
                            ),
                        ),
                )

                const u = new Universidade(
                    universidade.id,
                    universidade.nome,
                    institutos,
                )
                return u
            },
        )
        return universidades
    }

    async cadastrar(props: CadastrarUniversidadeProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/universidades",
            props,
            true,
        )
    }

    async cadastrarInstituto(props: CadastrarInstitutoProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/universidades/institutos",
            props,
            true,
        )
    }

    async cadastrarCurso(props: CadastrarCursoProps): Promise<void> {
        await this.httpService.post(
            "http://localhost:3001/universidades/cursos",
            props,
            true,
        )
    }
}
