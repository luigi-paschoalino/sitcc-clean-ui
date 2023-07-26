import axios from "axios"

export class HttpServiceImpl {
    constructor() {}

    async get(url: string, auth: boolean): Promise<any> {
        if (auth) {
            return axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.get(url)
    }

    async post(url: string, body: any, auth: boolean): Promise<any> {
        if (auth) {
            return axios.post(url, body, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.post(url, body)
    }

    async patch(url: string, body: any, auth: boolean): Promise<any> {
        if (auth) {
            return axios.patch(url, body, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.patch(url, body)
    }
}
