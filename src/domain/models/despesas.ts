import { TiposPagamentosEnum } from "./tipos-pagamentos";

export interface DespesasModel {
  id: number;
  valor: number;
  descricao: string;
  data: string;
  tipo_pagamento: TiposPagamentosEnum;
  categoria: string;
}