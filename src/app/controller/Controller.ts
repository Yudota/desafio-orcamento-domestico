import { Request, Response } from "express";

class Controller {

  public handle(req: Request, res: Response) {
    return res.json({ data: {} });
  }
}
export const controller = new Controller(); 