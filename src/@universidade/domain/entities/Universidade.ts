import { Instituto } from "./Instituto"

export class Universidade {
  constructor(
    private id: string,
    private nome: string,
    private institutos: Instituto[],
  ) {}

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      institutos: this.institutos.map((instituto) => instituto.toJson()),
    }
  }
}
