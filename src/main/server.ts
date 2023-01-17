import { OracleConnection } from '../infra/db/oracle-developer/helpers/oracle-developer-helper'

import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
OracleConnection.connect({
  user: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWD),
  connectString: String(process.env.DATABASE_URI)
})
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
