import {
  AddDespesas,
  DeleteDespesas,
  ListDespesas,
  UpdateDespesas
} from '../../../../domain/usecases/despesas'

export interface DespesasCRUD extends AddDespesas, DeleteDespesas, ListDespesas, UpdateDespesas { }
