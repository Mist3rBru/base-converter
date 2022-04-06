import { ApolloServer, gql } from 'apollo-server'
import { adaptResolver } from '@/main/adapters/'
import { makeBaseConverterController } from '@/main/composers/controllers'

const typeDefs = gql`
  type Query {
    _: String
  }

  extend type Query {
    convert (value: String!, actualBase: Int!, desiredBases: [Int!]!): [Base!]!
  }

  type Base {
    base: String!
    value: String!
  }
`
const resolvers = {
  Query: {
    convert: async (parent: any, args: any) => await adaptResolver(makeBaseConverterController(), args)
  }
}

export const app = new ApolloServer({ typeDefs, resolvers })
