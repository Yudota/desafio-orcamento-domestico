import { CategoriasModel } from '../../models/categorias'

export interface ListCategorias {
  listAll: () => Promise<Array<CategoriasModel>>
  getCategorias(id: number): Promise<CategoriasModel>
}
