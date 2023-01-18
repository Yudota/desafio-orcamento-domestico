import { Router } from "express";
import Controller from "../../presentation/controller/Controller"
const router: Router = Router()


router.get("/despesas", Controller.handle);
router.post("/despesas", Controller.handle)
export { router };
