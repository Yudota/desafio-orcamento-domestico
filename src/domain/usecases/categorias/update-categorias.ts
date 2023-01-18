import { CategoriasModel } from '../../models/categorias'
import { TiposPagamentosEnum } from '../../models/tipos-pagamentos';

export interface UpdateCategoriasModel {
  id: number;
  nome: string;
  descricao: string;
}

export interface AddDespesas {
  update: (categoria: UpdateCategoriasModel) => Promise<CategoriasModel>
}
