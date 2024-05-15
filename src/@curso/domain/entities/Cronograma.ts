export class Cronograma {
    constructor(
        private id: string,
        private ano: number,
        private semestre: string,
        private atividades: {
            id: string
            titulo: string
            descricao: string
            data: string
        }[],
    ) {}

    getId() {
        return this.id
    }

    getAno() {
        return this.ano
    }

    getSemestre() {
        return this.semestre
    }

    getAtividades() {
        return this.atividades
    }
}
