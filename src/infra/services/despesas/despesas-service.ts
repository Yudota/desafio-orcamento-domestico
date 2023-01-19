import { AddDespesasModel, ListDespesasModel } from "../../../domain/usecases/despesas";
import { DespesasPgRepository } from "../../../infra/db/postgres/despesas/despesas-pg-repository";
import responseFormater, { ResponseFormatter } from "../../../presentation/controller/response-formater";

export class DespesasService {
  repoDespesas = new DespesasPgRepository()
  success = true
  async listAll(params: ListDespesasModel): Promise<ResponseFormatter> {

    try {
      const data = await this.repoDespesas.listAll(params)

      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
  async list(dataInicial: string, dataFinal: string): Promise<ResponseFormatter> {
    try {

      const data = await this.repoDespesas.list(dataInicial, dataFinal)
      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
  async add(despesa: AddDespesasModel): Promise<ResponseFormatter> {
    try {

      const data = await this.repoDespesas.add(despesa)
      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
}