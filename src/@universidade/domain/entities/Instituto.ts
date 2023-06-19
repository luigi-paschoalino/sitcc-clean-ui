import { Curso } from "./Curso"

export class Instituto {
  constructor(
    private id: string,
    private nome: string,
    private cursos: Curso[],
  ) {}

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      cursos: this.cursos.map((curso) => curso.toJson()),
    }
  }
}
