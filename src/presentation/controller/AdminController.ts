import { Request, Response } from "express";
import { PgConnection } from "../../infra/db/postgres/helpers/pg-helper";
import responseFormater from "./response-formater";

export default class AdminController {

  public static async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {

    switch (req.method) {
      case 'GET':
        return res.json(responseFormater({ method: 'GET' }, true))
      case 'POST':
        return res.json(responseFormater({ method: 'POST' }, true))
      case 'PUT':
        return res.json(responseFormater({ method: 'PUT' }, true))
      case 'PATCH':
        return res.json(responseFormater({ method: 'PATCH' }, true))
      case 'DELETE':
        return res.json(responseFormater({ method: 'DELETE' }, true))
      default:
        return res.json(responseFormater('deu errado', false))

    }
    // const result = await PgConnection.execute("select * from tipos_pagamentos")
    // return res.status(200).json({
    //   data: result.rows
    // });
  }
}