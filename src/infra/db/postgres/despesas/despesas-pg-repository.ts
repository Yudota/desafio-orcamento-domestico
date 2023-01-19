import { DeleteDespesasModel, ListDespesasModel, UpdateDespesasModel } from '../../../../domain/usecases/despesas'
import { DespesasCRUD } from '../../../../data/protocols/db/despesas/despesas-repository'
import { DespesasModel } from '../../../../domain/models/despesas'
import { AddDespesasModel } from '../../../../domain/usecases/despesas/add-despesas'
import { PgConnection } from '../helpers/pg-helper'

export class DespesasPgRepository implements DespesasCRUD {
  async delete(account: DeleteDespesasModel): Promise<void> {
    try {
      await PgConnection.execute(`
  DELETE despesas WHERE des_id = '${account.id}'
    );`)
    } catch (error) {
      throw new Error(error)
    }
  }
  async listAll(despesas: ListDespesasModel): Promise<DespesasModel[]> {
    try {
      const result = await PgConnection.execute(`SELECT * FROM despesas
    WHERE des_data_compra BETWEEN '${despesas.dataInicio}' AND '${despesas.dataFinal}'`)
      return result.rows as DespesasModel[];
    } catch (error) {
      throw new Error(error)
    }
  }
  async list(dataInicial: string, dataFinal: string): Promise<DespesasModel[]> {
    try {
      const result = await PgConnection.execute(`SELECT * FROM despesas WHERE des_data_compra BETWEEN '${dataInicial}' AND '${dataFinal}'`)
      return result.rows as DespesasModel[];
    } catch (error) {
      throw new Error(error)
    }

  }
  async update(despesa: Partial<UpdateDespesasModel>): Promise<DespesasModel> {
    if (!despesa.id) throw new Error("O campo 'id' é obrigatório.");

    let query = `UPDATE despesas SET `;
    if (despesa.valor) query += `valor = ${despesa.valor},`;
    if (despesa.descricao) query += `descricao = '${despesa.descricao}',`;
    if (despesa.data) query += `data = '${despesa.data}',`;
    if (despesa.tipo_pagamento) query += `tipo_pagamento = '${despesa.tipo_pagamento}',`;
    if (despesa.categoria) query += `categoria = '${despesa.categoria}',`;
    if (query === `UPDATE despesas SET `) throw new Error("Ao menos um campo precisa ser informado.");

    query = query.slice(0, -1);
    query += ` WHERE id = ${despesa.id}`;

    try {
      const result = await PgConnection.execute(query);
      return result as DespesasModel;
    } catch (error) {
      throw new Error(error);
    }
  }
  async add(despesa: AddDespesasModel): Promise<DespesasModel> {
    try {
      const result = await PgConnection.execute(`
    INSERT INTO despesas(
      des_valor,
      des_data_compra,
      des_descricao,
      des_tpg_id,
      des_cat_id,
      des_end_id,
      des_numero_estabelecimento
      ) values(
        '${despesa.valor}',
        '${despesa.data_compra}',
        '${despesa.descricao}',
        '${despesa.tipo_pagamento_id}',
        '${despesa.categoria_id}',
        '${despesa.endereco_id}',
        '${despesa.numero_estabelecimento}'
      ) RETURNING *;`)
      return result.rows as DespesasModel
    } catch (error) {
      throw new Error(error);

    }
  }
}
