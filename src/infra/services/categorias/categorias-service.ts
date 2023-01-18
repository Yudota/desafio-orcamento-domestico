import { CategoriasPgRepository } from "../../../infra/db/postgres/categorias/categorias-pg-repository";
import responseFormater, { ResponseFormatter } from "../../../presentation/controller/response-formater";

export class CategoriasService {
  repoDespesas = new CategoriasPgRepository()
  success = true
  async listAll(): Promise<ResponseFormatter> {

    try {
      const data = await this.repoDespesas.listAll()

      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
  async getCategorias(id: number): Promise<ResponseFormatter> {
    try {
      const data = await this.repoDespesas.getCategorias(id)

      return responseFormater(data, this.success)
    } catch (error) {
      return responseFormater(error, false)
    }
  }
}