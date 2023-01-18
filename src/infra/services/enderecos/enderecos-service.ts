import { AddEnderecosModel } from "../../../domain/usecases/enderecos";
import { EnderecosPgRepository } from "../../../infra/db/postgres/enderecos/enderecos-pg-repository";
import responseFormater, { ResponseFormatter } from "../../../presentation/controller/response-formater";

export class EnderecosService {
  repo = new EnderecosPgRepository()
  success = true
  async listAll(): Promise<ResponseFormatter> {

    try {
      const data = await this.repo.listAll()

      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
  async add(endereco: AddEnderecosModel): Promise<ResponseFormatter> {
    try {


      const data = await this.repo.add(endereco)

      return responseFormater(data[0], this.success)
    } catch (error) {

      return responseFormater(error.message, false)
    }
  }
}