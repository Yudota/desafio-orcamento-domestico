import jsPDF from "jspdf";

export default class ListDespesasPdf {

  convertListToPdf(data: any) {
    const doc = new jsPDF();
    let altura = 10;
    let linha = 0;

    // Definindo o tamanho da fonte
    doc.setFontSize(12);
    // Cabeçalho da tabela
    doc.cell(10, altura, 40, 10, 'Valor', linha, '');
    doc.cell(50, altura, 70, 10, 'Descricao', linha, '');
    doc.cell(120, altura, 70, 10, 'Data da Compra', linha, '');
    data.forEach((line) => {
      altura += 20;
      linha++;
      doc.cell(10, altura, 40, 10, line.des_valor, linha, '');
      doc.cell(50, altura, 70, 10, line.des_descricao, linha, '');
      doc.cell(50, altura, 70, 10, line.des_data_compra.toLocaleString(), linha, '');
      console.log(line.des_data_compra);
    })
    doc.save()
    return doc.output();
  }
}