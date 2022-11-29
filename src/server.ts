import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { AppointmentsResolver } from './resolvers/appointments-resolvers'
import path from 'node:path'
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AppointmentsResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })
  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen()

  console.log(`🚀 Http server running on ${url} 👋`)
}

bootstrap()
