import { EnderecosModel } from '../../models/enderecos'

export interface ListEnderecos {
  listAll: () => Promise<Array<EnderecosModel>>
}
