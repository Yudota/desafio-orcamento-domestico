import { Request, Response } from "express"
import { ListDespesasModel } from "../../../../domain/usecases/despesas"
import { DespesasService } from "../../../../infra/services/despesas/despesas-service"
import responseFormater from "../../../../presentation/controller/response-formater"
import { checkFormatDate } from "../../../../presentation/helpers/check-data"
import { dataConverter } from "../../../../presentation/helpers/data-converter"
import { Workbook } from "exceljs";
import ListDespesasPdf from "./list-despesas-pdf";

export default class ListDespesasService {
  formatos = new Map<string, string>();

  constructor() {
    this.formatos.set("pdf", "application/pdf");
    this.formatos.set("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  async handle(req: Request, res: Response) {

    const { dataFinal, dataInicio, formato } = req.query
    //verificar se os dados de data estão no formato dd/mm/yyyy
    const queryPayload = { dataFinal: dataFinal?.toString(), dataInicio: dataInicio?.toString(), formato: formato?.toString().toLowerCase() } as ListDespesasModel
    if (!queryPayload.dataFinal || !queryPayload.dataInicio) return res.status(400).json(responseFormater('Necessita informar data de inicio e data final!', false))

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
    const format = String(formato).toLowerCase();

    if (!this.formatos.has(format)) {
      return res.status(400).json(responseFormater(`formato enviado inválido: ${format}`, false));
    }

    res.setHeader('Content-Type', this.formatos.get(format))
    res.setHeader("Content-Disposition", `attachment; filename="relatorio${initialDate + finalDate}.${format}"`);

    // verificar qual formato para conversão de arquivo
    switch (String(formato).toLowerCase()) {
      case 'pdf':
        const listDespesasPdf = new ListDespesasPdf();
        return res.send(listDespesasPdf.convertListToPdf(listData.data));
      case 'xlsx':
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Compras");
        worksheet.addRow(["Valor", "Descrição", "Data da Compra"]);

        listData.data.forEach((line) => {
          worksheet.addRow([line.des_valor, line.des_descricao, line.des_data_compra]);
        })
        await workbook.xlsx.write(res)
        return res

      default:
        return res.json(listData)
    }
  }
}