import { query, Request, Response } from "express";
import { PgConnection } from "../../infra/db/postgres/helpers/pg-helper";

export default class Controller {

  public async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const result = await PgConnection.execute("select * from tipos_pagamentos")
    return res.status(200).json({
      data: result.rows
    });
  }
}