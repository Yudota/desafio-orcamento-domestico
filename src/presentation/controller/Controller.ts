import { query, Request, Response } from "express";
import { PgConnection } from "../../infra/db/postgres/helpers/pg-helper";
import decoratorResponse from "./decorator-response";

export default class Controller {

  public async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    console.log('Requisicao:', req)

    switch (req.method) {
      case 'GET':
        return res.json(decoratorResponse({ method: 'get' }, true))
      case 'POST':
        return res.json(decoratorResponse({ method: 'post' }, true))
      default:
        return res.json(decoratorResponse('deu errado', false))

    }
  }
}