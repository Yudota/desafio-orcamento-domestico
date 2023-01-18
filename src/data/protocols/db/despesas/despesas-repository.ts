import { AddDespesasModel } from '../../../../domain/usecases/despesas/add-despesas'
import { DespesasModel } from '../../../../domain/models/despesas'

export interface DespesasCRUD {
  add: (account: AddDespesasModel) => Promise<DespesasModel>
}
