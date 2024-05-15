export enum TIPO_ATIVIDADE {
    ENTREGA_PARCIAL = "ENTREGA_PARCIAL",
    ENTREGA_FINAL = "ENTREGA_FINAL",
    DATA_DEFESA = "DATA_DEFESA",
}

export class Atividade {
    constructor(
        private id: string,
        private data: Date,
        private titulo: TIPO_ATIVIDADE,
        private descricao: string,
    ) {}

    getId() {
        return this.id
    }

    getData() {
        return this.data
    }

    getTitulo() {
        return this.titulo
    }

    getDescricao() {
        return this.descricao
    }

    toJson() {
        return {
            id: this.id,
            data: this.data,
            titulo: this.titulo,
            descricao: this.descricao,
        }
    }
}
