export class Curso {
    constructor(
        private id: string,
        private nome: string,
        private codigo: string,
    ) {}

    getId() {
        return this.id
    }

    getNome() {
        return this.nome
    }

    getCodigo() {
        return this.codigo
    }

    toJson() {
        return {
            id: this.id,
            nome: this.nome,
            codigo: this.codigo,
        }
    }
}
