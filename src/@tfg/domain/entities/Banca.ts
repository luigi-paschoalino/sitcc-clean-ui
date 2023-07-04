export class Banca {
  constructor(
    private id: string,
    private id_professor,
    private id_tcc,
    private dia_hora,
    private nota_final,
    private nota_apresentacao,
    private nota_trabalho,
  ) {}

  toJson() {
    return {
      id: this.id,
      id_professor: this.id_professor,
      id_tcc: this.id_tcc,
      dia_hora: this.dia_hora,
      nota_final: this.nota_final,
      nota_apresentacao: this.nota_apresentacao,
      nota_trabalho: this.nota_trabalho,
    }
  }
}
