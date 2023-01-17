import { PgConnection } from '../infra/db/postgres/helpers/pg-helper'

import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
PgConnection.connect(process.env.DATABASE_CONNECTION)
  .then(async () => {
    console.log(PgConnection.client);

    const app = (await import('./config/app')).default
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch((e) => console.error(e))
