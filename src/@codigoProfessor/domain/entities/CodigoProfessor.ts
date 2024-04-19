export class CodigoProfessor {
    constructor(
        private id: string,
        private codigo: string,
        private email: string,
        private disponivel: boolean,
    ) {}

    getId() {
        return this.id
    }

    getCodigo() {
        return this.codigo
    }

    getEmail() {
        return this.email
    }

    getDisponivel() {
        return this.disponivel
    }

    toJson() {
        return {
            id: this.id,
            codigo: this.codigo,
            email: this.email,
            disponivel: this.disponivel,
        }
    }
}
