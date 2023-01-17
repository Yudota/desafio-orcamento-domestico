import { Router } from "express";
import { controller } from "./app/controller/Controller"
const router: Router = Router()

//Routes
router.get("/", controller.handle);

export { router };