export enum TIPO_USUARIO {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR",
    COORDENADOR = "COORDENADOR",
    ADMINISTRADOR = "ADMINISTRADOR",
}

export class Usuario {
    constructor(
        private id: string,
        private nome: string,
        private curso: {
            id: string
            nome: string
            codigo: string
        },
        private email: string,
        private tipo: TIPO_USUARIO,
        private numero: string,
        private matricula: string,
        private perfilProfessor?: {
            id: string
            descricao: string
            link: string
            areasAtuacao: string[]
            projetos: {
                titulo: string
                descricao: string
                preRequisitos: string
                disponivel: boolean
            }[]
        },
    ) {}

    public getId() {
        return this.id
    }

    public getNome() {
        return this.nome
    }

    public getCurso() {
        return this.curso
    }

    public getEmail() {
        return this.email
    }

    public getMatricula() {
        return this.matricula
    }

    public getTipo() {
        return this.tipo
    }

    public getNumero() {
        return this.numero
    }

    public getPerfilProfessor() {
        return this.perfilProfessor
    }

    toJson() {
        return {
            id: this.id,
            curso: this.curso,
            nome: this.nome,
            email: this.email,
            matricula: this.matricula,
            tipo: this.tipo,
            numero: this.numero,
            perfilProfessor: this.perfilProfessor,
        }
    }
}
