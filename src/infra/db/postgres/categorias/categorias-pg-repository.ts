import { CategoriasCRUD } from '../../../../data/protocols/db/categorias/categorias-repository'
import { CategoriasModel } from '../../../../domain/models/categorias'
import { PgConnection } from '../helpers/pg-helper'

export class CategoriasPgRepository implements CategoriasCRUD {
  async getCategorias(id: number): Promise<CategoriasModel> {
    try {
      const result = await PgConnection.execute(`SELECT * FROM categorias WHERE cat_id =${id}`)
      return result.rows as CategoriasModel;
    } catch (error) {
      throw new Error(error)
    }
  }
  async listAll(): Promise<CategoriasModel[]> {
    try {
      const result = await PgConnection.execute(`SELECT * FROM categorias`)
      return result.rows as CategoriasModel[];
    } catch (error) {
      throw new Error(error)
    }
  }
}
