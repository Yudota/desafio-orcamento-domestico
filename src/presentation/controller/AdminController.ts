import { Request, Response } from "express";
import { PgConnection } from "../../infra/db/postgres/helpers/pg-helper";
import decoratorResponse from "./decorator-response";

export default class AdminController {

  public async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    console.log('Requisicao:', req)

    switch (req.method) {
      case 'GET':
        return res.json(decoratorResponse({ method: 'GET' }, true))
      case 'POST':
        return res.json(decoratorResponse({ method: 'POST' }, true))
      case 'PUT':
        return res.json(decoratorResponse({ method: 'PUT' }, true))
      case 'PATCH':
        return res.json(decoratorResponse({ method: 'PATCH' }, true))
      case 'DELETE':
        return res.json(decoratorResponse({ method: 'DELETE' }, true))
      default:
        return res.json(decoratorResponse('deu errado', false))

    }
    // const result = await PgConnection.execute("select * from tipos_pagamentos")
    // return res.status(200).json({
    //   data: result.rows
    // });
  }
}