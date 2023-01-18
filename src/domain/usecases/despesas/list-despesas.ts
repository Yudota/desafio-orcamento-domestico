import { DespesasModel } from '../../models/despesas'

enum FormatosEnum {
  PDF = 'pdf',
  XLSX = 'xlsx',
}
export interface ListDespesasModel {
  formato: FormatosEnum,
  dataInicio: string,
  dataFinal: string

}

export interface ListDespesas {
  listAll: (despesas: ListDespesasModel) => Promise<Array<DespesasModel>>
}
