import { DespesasModel } from '../../models/despesas'
import { TiposPagamentosEnum } from '../../models/tipos-pagamentos';

export interface AddDespesasModel {
  valor: number;
  data_compra: string;
  descricao: string;
  tipo_pagamento_id: number;
  categoria_id: number;
  endereco_id: number;
  numero_estabelecimento: string;

}

export interface AddDespesas {
  add: (account: AddDespesasModel) => Promise<DespesasModel>
}
