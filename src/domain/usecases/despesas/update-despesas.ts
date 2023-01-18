import { DespesasModel } from '../../models/despesas'
import { TiposPagamentosEnum } from '../../models/tipos-pagamentos';

export interface UpdateDespesasModel {
  id: number;
  valor: number;
  descricao: string;
  data: string;
  tipo_pagamento: TiposPagamentosEnum;
  categoria: string;
}

export interface UpdateDespesas {
  update: (despesa: UpdateDespesasModel) => Promise<DespesasModel>
}
