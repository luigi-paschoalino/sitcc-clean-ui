import axios from "axios"

export class HttpServiceImpl {
  constructor() {}

  async get(url: string): Promise<any> {
    return axios.get(url)
  }

  async post(url: string, body: any): Promise<any> {
    return axios.post(url, body)
  }
}
