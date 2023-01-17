import { App } from "./app"
import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000

new App().server.listen(port, () => console.log(`listening on ${port} port`))