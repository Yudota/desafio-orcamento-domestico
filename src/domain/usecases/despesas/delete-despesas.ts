export interface DeleteDespesasModel {
  id: number
}

export interface AddDespesas {
  delete: (account: DeleteDespesasModel) => Promise<void>
}
