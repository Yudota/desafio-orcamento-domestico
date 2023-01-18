import { Router } from "express";
import AdminController from "../../presentation/controller/AdminController";

enum endpoints {
  CATEGORIAS = "categorias",
  ENDERECOS = "enderecos"
}

const adminRoutes = Router();

for (const endpoint in endpoints) {
  adminRoutes.get(`/${endpoint}`, AdminController.handle);
  adminRoutes.post(`/${endpoint}`, AdminController.handle);
  adminRoutes.put(`/${endpoint}`, AdminController.handle);
  adminRoutes.patch(`/${endpoint}`, AdminController.handle);
  adminRoutes.delete(`/${endpoint}`, AdminController.handle);
}
export { adminRoutes };
