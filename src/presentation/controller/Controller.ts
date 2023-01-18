import { ListDespesasModel } from "domain/usecases/despesas";
import { Request, Response } from "express";
import { DespesasService } from "../../infra/services/despesas/despesas-service";
import responseFormater from "./response-formater";

export default class Controller {

  public static async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    switch (req.method) {
      case 'GET':
        const { dataFinal, dataInicio, formato } = req.query
        const payload = { dataFinal: dataFinal?.toString(), dataInicio: dataInicio?.toString(), formato: formato?.toString().toLowerCase() } as ListDespesasModel
        if (!payload.dataFinal || !payload.dataInicio || !payload.formato) return res.status(400).json(responseFormater('Necessita informar data de inicio, data final e formato do documento!', false))
        //verifica se na query existe as datas
        const data = await (new DespesasService().listAll(payload))

        return res.json(data)
      case 'POST':
        //converte o formato dd/mm/yyyy para unix timestamp usando >>> new Date(req.query.data_compra).getTime() / 1000
        return res.json(responseFormater({ method: 'post' }, true))
      default:
        return res.json(responseFormater('deu errado', false))

    }
  }
}