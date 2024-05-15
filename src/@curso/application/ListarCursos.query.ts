import { Curso } from "../domain/entities/Curso"
import { CursoHttpGateway } from "../domain/gateways/Curso.gateway"

export class ListarCursosQuery {
    constructor(private cursoGateway: CursoHttpGateway) {}

    async execute() {
        const result = await this.cursoGateway.listar()
        const cursos = result.map((curso) => {
            return new Curso(curso.id, curso.nome, curso.codigo)
        })

        return cursos
    }
}
