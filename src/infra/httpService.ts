import axios, { AxiosRequestConfig } from "axios"

export class HttpServiceImpl {
    async get(
        url: string,
        auth: boolean,
        options?: AxiosRequestConfig,
    ): Promise<any> {
        if (auth) {
            return axios.get(url, {
                ...options,
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.get(url)
    }

    async post(
        url: string,
        body: any,
        auth: boolean,
        options?: AxiosRequestConfig,
    ): Promise<any> {
        if (auth) {
            return axios.post(url, body, {
                ...options,
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.post(url, body)
    }

    async put(url: string, body: any, auth: boolean): Promise<any> {
        if (auth) {
            return axios.put(url, body, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            })
        }
        return axios.put(url, body)
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
