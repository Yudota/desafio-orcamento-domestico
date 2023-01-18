export interface DeleteDespesasModel {
  id: number
}

export interface DeleteDespesas {
  delete: (account: DeleteDespesasModel) => Promise<void>
}
