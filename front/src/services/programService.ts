import { get, post } from "../util/http"
const api = '/program'
export const programService = {
  api,
  getAll: async() =>{
    return await get({api: `${api}/`})
  },

}

