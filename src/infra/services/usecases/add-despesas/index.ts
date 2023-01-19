import axios from "axios";
import moment from "moment";
import { Request, Response } from "express";
import { AddDespesasModel } from "../../../../domain/usecases/despesas";
import { AddEnderecosModel } from "../../../../domain/usecases/enderecos";
import { CategoriasService } from "../../../../infra/services/categorias/categorias-service";
import { DespesasService } from "../../../../infra/services/despesas/despesas-service";
import { EnderecosService } from "../../../../infra/services/enderecos/enderecos-service";
import responseFormater from "../../../../presentation/controller/response-formater";

export class AddDespesasService {
  async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    //converte o formato dd/mm/yyyy para unix timestamp usando >>> new Date(req.query.data_compra).getTime() / 1000
    const instance = axios.create({
      baseURL: 'https:viacep.com.br/ws/',
      timeout: 5000,
      headers: { 'X-Custom-Header': 'foobar' }
    });
    const responseCEP = await instance.get(`${req.body.cep}/json`)
    if (!responseCEP.data.cep) {
      return res.status(404).json(responseFormater('CEP não encontrado', false))
    }
    const { data: dataCategoria, success: categoriaSuccess } = await new CategoriasService().getCategorias(req.body.categoria_id)
    if (!categoriaSuccess) {
      return res.status(404).json(responseFormater('Categoria não encontrada', false))
    }
    const { data: dataEndereco, success: enderecoSuccess } = await new EnderecosService().add({
      cep: req.body.cep,
      logradouro: responseCEP.data.logradouro,
      bairro: responseCEP.data.bairro,
      localidade: responseCEP.data.localidade,
      uf: responseCEP.data.uf
    } as AddEnderecosModel)
    if (!enderecoSuccess) {
      return res.status(404).json(responseFormater('Não foi possivel cadastrar o cep informado. Tente mais tarde.', false))
    }
    const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id, numero_estabelecimento } = req.body
    const splitDate = new Date(data_compra.split("/").reverse().join("-"))
    const parsedDate = splitDate.toISOString().slice(0, 10);

    const bodyPayload: AddDespesasModel = {
      valor,
      data_compra: moment(parsedDate).format('YYYY-MM-DD'),
      descricao,
      tipo_pagamento_id,
      categoria_id,
      endereco_id: dataEndereco.end_id,
      numero_estabelecimento,
    }
    const { data: despesaData, success: despesaSuccess } = await (new DespesasService().add(bodyPayload))
    if (!despesaSuccess) {
      return res.json(responseFormater('Não foi possível adicionar a despesa, verifique os dados e tente novamente.', false))
    }
    console.log('despesa adicionada:', despesaData)
    const {
      des_valor,
      des_data_compra,
      des_descricao,
      des_numero_estabelecimento
    } = despesaData[0]

    const { end_id, ...rest } = dataEndereco

    return res.json(responseFormater({
      valor: des_valor,
      data_compra: des_data_compra,
      descricao: des_descricao,
      categoria: dataCategoria.nome,
      endereco_estabelecimento: {
        ...rest
      },
      numero_estabelecimento: des_numero_estabelecimento
    }, true))
  }
}