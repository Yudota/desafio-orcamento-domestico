import { AddDespesasModel } from '../../../../domain/usecases/add-despesas'
import { DespesasModel } from '../../../../domain/models/despesas'

export interface DespesasCRUD {
  add: (account: AddDespesasModel) => Promise<DespesasModel>
}
