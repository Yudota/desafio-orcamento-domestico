import { PgConnection } from '../infra/db/postgres/helpers/pg-helper'

import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.API_PORT
PgConnection.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch((e) => console.error(e))
