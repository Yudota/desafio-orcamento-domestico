import { EnderecosCRUD } from '../../../../data/protocols/db/enderecos/enderecos-repository'
import { EnderecosModel } from '../../../../domain/models/enderecos'
import { AddEnderecosModel } from '../../../../domain/usecases/enderecos/add-enderecos'
import { PgConnection } from '../helpers/pg-helper'

export class EnderecosPgRepository implements EnderecosCRUD {
  async listAll(): Promise<EnderecosModel[]> {

    try {
      await PgConnection.connect()
      const result = await PgConnection.execute(`SELECT * FROM enderecos`)
      return result.rows as EnderecosModel[];
    } catch (error) {
      console.log(error);
    }
  }
  async add(endereco: AddEnderecosModel): Promise<EnderecosModel> {
    try {
      const result = await PgConnection.execute(`
    INSERT INTO enderecos(
      end_cep,
      end_logradouro,
      end_bairro,
      end_localidade,
      end_uf
      )values(
        '${endereco.cep}',
        '${endereco.logradouro}',
        '${endereco.bairro}',
        '${endereco.localidade}',
        '${endereco.uf}'
      ) RETURNING *`)

      return result.rows as EnderecosModel
    } catch (error) {
      throw new Error(error);

    }
  }
}
