import {
  api as client,
  postData
} from 'utils/FetchData'

const post = (url: string) => (options: { types: Array<string>, actionParams: any, params: any, onSuccess?(result: any) }) => postData(
  url,
  options)

const api = {
  client,
  auth: {
    login: post('/login'),
    logout: post('/logout'),
  },
}

export default api
