import { query, Request, Response } from "express";
import * as Excel from 'exceljs';

export default class Controller {

  public handle(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).json({
      data: 'deu certo'
    });
  }
}