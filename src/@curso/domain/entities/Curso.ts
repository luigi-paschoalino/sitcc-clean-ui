export class Curso {
  constructor(
    private id: string,
    private nome: string,
    private codigo: string,
  ) {}

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      codigo: this.codigo,
    }
  }
}
