import { Request, Response } from "express";
import responseFormater from "./response-formater";
import { AddDespesasService } from '../../infra/services/usecases/add-despesas';
import ListDespesasService from '../../infra/services/usecases/list-despesas';
export default class Controller {

  public static async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    switch (req.method) {
      case 'GET':
        return new ListDespesasService().handle(req, res)
      case 'POST':
        return new AddDespesasService().handle(req, res)
      default:
        return res.json(responseFormater('deu errado', false))

    }
  }
}