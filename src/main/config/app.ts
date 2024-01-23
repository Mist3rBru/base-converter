import { adaptResolver } from '#main/adapters/index.js'
import { makeBaseConverterController } from '#main/composers/controllers/index.js'
import { ApolloServer } from '@apollo/server'

const typeDefs = `#graphql
  type Query {
    _: String
  }

  extend type Query {
    convert(value: String!, actualBase: Int!, desiredBases: [Int!]!): [Base!]!
  }

  type Base {
    base: String!
    value: String!
  }
`
const resolvers = {
  Query: {
    convert: async (parent: unknown, args: unknown[]): Promise<unknown> => {
      return await adaptResolver(makeBaseConverterController(), args)
    },
  },
}

export const app = new ApolloServer({ typeDefs, resolvers })
