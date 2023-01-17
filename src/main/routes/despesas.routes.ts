import { Router } from "express";
import Controller from "../../presentation/controller/Controller"
const router: Router = Router()
const controller: Controller = new Controller()


router.get("/despesas", controller.handle);
router.post("/despesas", controller.handle)
export { router };
