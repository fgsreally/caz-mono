import {createChainReq} from 'phecda-client'
const instance = axios.create({ baseURL: '' })

instance.interceptors.request.use((config) => {
  // config.headers.Authorization = token
  return config
}, (error) => {

},

)
export const controller = createChainReq(instance)
