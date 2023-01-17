import { Router } from "express";
import Controller from "../../presentation/controller/Controller";

enum endpoints {
  PLAYER = "player",
  CIDADE = "cidade",
  ESTADO = "estado"
}

const adminRoutes = Router();
const controller = new Controller();

for (const endpoint in endpoints) {
  adminRoutes.get(`/${endpoint}`, controller.handle);
  adminRoutes.post(`/${endpoint}`, controller.handle);
  adminRoutes.put(`/${endpoint}`, controller.handle);
  adminRoutes.patch(`/`, controller.handle);
  adminRoutes.delete(`/${endpoint}`, controller.handle);
}
export { adminRoutes };
