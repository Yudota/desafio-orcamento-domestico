import { Request, Response } from "express"
import { ListDespesasModel } from "../../../../domain/usecases/despesas"
import { DespesasService } from "../../../../infra/services/despesas/despesas-service"
import responseFormater from "../../../../presentation/controller/response-formater"
import { checkFormatDate } from "../../../../presentation/helpers/check-data"
import { dataConverter } from "../../../../presentation/helpers/data-converter"

export default class ListDespesasService {

  async handle(req: Request, res: Response) {

    const { dataFinal, dataInicio, formato } = req.query
    //verificar se os dados de data estão no formato dd/mm/yyyy
    const queryPayload = { dataFinal: dataFinal?.toString(), dataInicio: dataInicio?.toString(), formato: formato?.toString().toLowerCase() } as ListDespesasModel
    if (!queryPayload.dataFinal || !queryPayload.dataInicio || !queryPayload.formato) return res.status(400).json(responseFormater('Necessita informar data de inicio, data final e formato do documento!', false))

    const correctInitialDate = checkFormatDate(String(dataInicio)) && dataConverter(String(dataInicio))

    const correctFinalDate = checkFormatDate(String(dataFinal)) && dataConverter(String(dataFinal))

    if (!correctInitialDate && !correctFinalDate) {
      return res.json(responseFormater('informe corretamente as datas, seguindo o formato dd/mm/yyyy', false))
    }
    if (correctInitialDate > correctFinalDate) {
      return res.status(400).json(responseFormater('data final é maior que a data inicial', false))
    }
    const initialDate = correctInitialDate.toISOString().slice(0, 10);
    const finalDate = correctFinalDate.toISOString().slice(0, 10)

    const listData = await (new DespesasService().list(initialDate, finalDate))
    return res.json(listData)
  }
}