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
        private curso: string,
        private email?: string,
        private senha?: string,
        private tipo?: TIPO_USUARIO,
        private numero?: string,
    ) {}

    toJson() {
        return {
            id: this.id,
            curso: this.curso,
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            tipo: this.tipo,
            numero: this.numero,
        }
    }
}
