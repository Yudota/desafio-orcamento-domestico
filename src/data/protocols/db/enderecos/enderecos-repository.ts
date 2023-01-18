import {
  AddEnderecos, ListEnderecos
} from '../../../../domain/usecases/enderecos'

export interface EnderecosCRUD extends ListEnderecos, AddEnderecos { }
