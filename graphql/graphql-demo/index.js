import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs: `#graphql
    type Query {
      id: ID!
      name: String
      age: Int
    }
  `,
  resolvers: {
    Query: {
      id: () => "1",
      name: () => "John Doe",
      age: () => 20,
    },
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at: ${url}`);
