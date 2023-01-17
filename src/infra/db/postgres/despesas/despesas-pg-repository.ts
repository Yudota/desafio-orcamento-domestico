import { DespesasCRUD } from '../../../../data/protocols/db/despesas/despesas-repository'
import { DespesasModel } from '../../../../domain/models/despesas'
import { AddDespesasModel } from '../../../../domain/usecases/add-despesas'
import { PgConnection } from '../helpers/pg-helper'

export class DespesasPgRepository implements DespesasCRUD {
  add(account: AddDespesasModel): Promise<any> {
    const result = PgConnection.execute(`INSERT INTO despesas() values();`)
    return result
  }
}
