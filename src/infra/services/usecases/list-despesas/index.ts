import { createWriteStream } from "fs";
import { Request, Response } from "express"
import { ListDespesasModel } from "../../../../domain/usecases/despesas"
import { DespesasService } from "../../../../infra/services/despesas/despesas-service"
import responseFormater from "../../../../presentation/controller/response-formater"
import { checkFormatDate } from "../../../../presentation/helpers/check-data"
import { dataConverter } from "../../../../presentation/helpers/data-converter"
import jsPDF from "jspdf";
import { Workbook, Worksheet } from "exceljs";

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

    // verificar qual formato para conversão de arquivo
    switch (String(formato).toLowerCase()) {
      case 'pdf':
        const doc = new jsPDF();

        // Definindo o tamanho da fonte
        doc.setFontSize(12);

        // Cabeçalho da tabela
        doc.cell(10, 10, 1, 0, 'Valor', 0, '');
        doc.cell(50, 10, 1, 0, 'Descrição', 1, '');
        doc.cell(50, 10, 1, 0, 'Data da Compra', 1, '');
        listData.data.forEach((line,) => {
          doc.cell(10, 10, 1, 0, line.des_valor, 2, '');
          doc.cell(50, 10, 1, 0, line.des_descricao, 3, '');
          doc.cell(50, 10, 1, 0, line.des_data_compra, 4, '');
        })
        doc.save()
        const pdf = doc.output();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader("Content-Disposition", `attachment; filename="relatorio${initialDate + finalDate}.pdf"`);


        res.send(pdf)
      case 'xlsx':
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename="relatorio${initialDate + finalDate}.xlsx"`);
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