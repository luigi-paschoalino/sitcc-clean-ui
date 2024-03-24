export class Tfg {
    constructor(
        private id: string,
        private aluno: string,
        private orientador: string,
        private titulo: string,
        private palavrasChave: string,
        private introducao: string,
        private objetivos: string,
        private bibliografia: string,
        private metodoPesquisa: string,
        private tecnicaPesquisa: string,
        private descricaoMetodologia: string,
        private resultadosEsperados: string,
        private status: string,
        private coorientador?: string,
    ) {}

    getId() {
        return this.id
    }

    getAluno() {
        return this.aluno
    }

    getOrientador() {
        return this.orientador
    }

    getTitulo() {
        return this.titulo
    }

    getPalavrasChave() {
        return this.palavrasChave
    }

    getIntroducao() {
        return this.introducao
    }

    getObjetivos() {
        return this.objetivos
    }

    getBibliografia() {
        return this.bibliografia
    }

    getMetodoPesquisa() {
        return this.metodoPesquisa
    }

    getTecnicaPesquisa() {
        return this.tecnicaPesquisa
    }

    getDescricaoMetodologia() {
        return this.descricaoMetodologia
    }

    getResultadosEsperados() {
        return this.resultadosEsperados
    }

    getStatus() {
        return this.status
    }

    toJson() {
        return {
            id: this.id,
            aluno: this.aluno,
            orientador: this.orientador,
            coorientador: this.coorientador,
            titulo: this.titulo,
            palavrasChave: this.palavrasChave,
            introducao: this.introducao,
            objetivos: this.objetivos,
            bibliografia: this.bibliografia,
            metodoPesquisa: this.metodoPesquisa,
            tecnicaPesquisa: this.tecnicaPesquisa,
            descricaoMetodologia: this.descricaoMetodologia,
            resultadosEsperados: this.resultadosEsperados,
            status: this.status,
        }
    }
}
