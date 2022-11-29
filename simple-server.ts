import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'node:crypto'

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }
  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`

interface User {
  id: string
  name: string
}

const users: User[] = []

const server = new ApolloServer({
  //rotas do gql
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users
      }
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name
        }
        users.push(user)

        return args.name
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Http server running on ${url} 👋`)
})
