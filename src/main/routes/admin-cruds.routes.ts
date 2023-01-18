import { Router } from "express";
import AdminController from "../../presentation/controller/AdminController";

enum endpoints {
  CATEGORIAS = "categorias"
}

const adminRoutes = Router();
const adminController = new AdminController();

for (const endpoint in endpoints) {
  adminRoutes.get(`/${endpoint}`, adminController.handle);
  adminRoutes.post(`/${endpoint}`, adminController.handle);
  adminRoutes.put(`/${endpoint}`, adminController.handle);
  adminRoutes.patch(`/${endpoint}`, adminController.handle);
  adminRoutes.delete(`/${endpoint}`, adminController.handle);
}
export { adminRoutes };
