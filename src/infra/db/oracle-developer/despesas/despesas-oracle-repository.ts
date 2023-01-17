import { DespesasCRUD } from '../../../../data/protocols/db/despesas/despesas-repository'
import { DespesasModel } from '../../../../domain/models/despesas'
import { AddDespesasModel } from '../../../../domain/usecases/add-despesas'
import { OracleConnection } from '../helpers/oracle-developer-helper'

export class AccountMongoRepository implements DespesasCRUD {
  add(account: AddDespesasModel): Promise<any> {
    const result = OracleConnection.execute(`INSERT INTO despesas() values();`)
    return result
  }
}
