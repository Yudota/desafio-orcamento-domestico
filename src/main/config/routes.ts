import { Express } from 'express'
import { adminRoutes } from '../routes/admin-cruds.routes'
import { router } from '../routes/despesas.routes'
export default (app: Express): void => {
  app.use('/api', router, adminRoutes)
}
