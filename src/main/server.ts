import { app } from '#main/config/index.js'
import { startStandaloneServer } from '@apollo/server/standalone'

startStandaloneServer(app, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    process.stdout.write(`🚀  Server running at ${url}\n`)
  })
  .catch(error => {
    console.error(error)
  })
