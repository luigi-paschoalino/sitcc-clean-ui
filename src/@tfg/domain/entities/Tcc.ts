export class Tcc {
  constructor(
    private aluno: string,
    private orientador: string,
    private titulo: string,
    private palavras_chave: string[],
    private introducao: string,
    private objetivos: string,
    private bibliografia: string,
    private metodologia: string,
    private resultados: string,
  ) {}

  toJson() {
    return {
      aluno: this.aluno,
      orientador: this.orientador,
      titulo: this.titulo,
      palavras_chave: this.palavras_chave,
      introducao: this.introducao,
      objetivos: this.objetivos,
      bibliografia: this.bibliografia,
      metodologia: this.metodologia,
      resultados: this.resultados,
    }
  }
}
