import { EnderecosModel } from '../../models/enderecos'

export interface AddEnderecosModel {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;

}

export interface AddEnderecos {
  add: (account: AddEnderecosModel) => Promise<EnderecosModel>
}
