export interface DeleteCategoriasModel {
  id: number
}

export interface DeleteCategorias {
  delete: (account: DeleteCategoriasModel) => Promise<void>
}
