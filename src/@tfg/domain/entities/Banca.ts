export class Banca {
    constructor(
        private professorId: string,
        private segundoProfessorId: string,
        private data: Date,
        private tfgId: string,
        private tfgNome: string,
        private notaApresentacaoProfessor?: number,
        private notaApresentacaoSegundoProfessor?: number,
        private notaTrabalhoProfessor?: number,
        private notaTrabalhoSegundoProfessor?: number,
    ) {}

    getProfessorId() {
        return this.professorId
    }

    getSegundoProfessorId() {
        return this.segundoProfessorId
    }

    getData() {
        return this.data
    }

    getNotaApresentacaoProfessor() {
        return this.notaApresentacaoProfessor
    }

    getNotaApresentacaoSegundoProfessor() {
        return this.notaApresentacaoSegundoProfessor
    }

    getNotaTrabalhoProfessor() {
        return this.notaTrabalhoProfessor
    }

    getNotaTrabalhoSegundoProfessor() {
        return this.notaTrabalhoSegundoProfessor
    }

    getTfgId() {
        return this.tfgId
    }

    getTfgNome() {
        return this.tfgNome
    }

    toJson() {
        return {
            professorId: this.professorId,
            segundoProfessorId: this.segundoProfessorId,
            data: this.data,
            notaApresentacaoProfessor: this.notaApresentacaoProfessor,
            notaApresentacaoSegundoProfessor:
                this.notaApresentacaoSegundoProfessor,
            notaTrabalhoProfessor: this.notaTrabalhoProfessor,
            notaTrabalhoSegundoProfessor: this.notaTrabalhoSegundoProfessor,
            tfgId: this.tfgId,
            tfgNome: this.tfgNome,
        }
    }
}
