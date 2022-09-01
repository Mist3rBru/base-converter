import 'module-alias/register'
import { app } from '@/main/config'

app
  .listen()
  .then(({ url }) => {
    process.stdout.write(`🚀  Server running at ${url}\n`)
  })
  .catch(error => {
    console.error(error)
  })
