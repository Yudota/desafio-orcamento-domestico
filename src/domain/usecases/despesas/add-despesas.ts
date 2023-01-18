import { DespesasModel } from '../../models/despesas'
import { TiposPagamentosEnum } from '../../models/tipos-pagamentos';

export interface AddDespesasModel {
  valor: number;
  descricao: string;
  data: string;
  tipo_pagamento: TiposPagamentosEnum;
  categoria: string;
}

export interface AddDespesas {
  add: (account: AddDespesasModel) => Promise<DespesasModel>
}
