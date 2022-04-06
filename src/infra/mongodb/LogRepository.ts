import { MongoHelper } from '@/infra/mongodb'
import { ILogErrorRepository } from '@/services/protocols'

export class LogRepository implements ILogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('logs')
    await errorsCollection.insertOne({ stack })
  }
}
