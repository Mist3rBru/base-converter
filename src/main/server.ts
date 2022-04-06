import 'module-alias/register'
import { app, env } from '@/main/config'
import { MongoHelper } from '@/infra/mongodb'

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    console.log('MongoDB is connected')
    await app.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
  .catch((error) => console.error('Server', error))
