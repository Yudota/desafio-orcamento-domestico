import { CategoriasModel } from '../../models/categorias'

export interface ListCategorias {
  listAll: () => Promise<Array<CategoriasModel>>
}
