import { CategoriasModel } from '../../models/categorias'

export interface AddCategoriasModel {
  nome: string;
  descricao: string;
}

export interface AddDespesas {
  add: (categoria: AddCategoriasModel) => Promise<CategoriasModel>
}
