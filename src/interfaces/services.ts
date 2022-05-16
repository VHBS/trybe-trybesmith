export default interface IService {
  code: number
  message: {
    message?: string
    token?: string
  }
}