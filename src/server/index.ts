import { ApolloServer, PubSub } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { getUserId } from "./utils";

const pubsub = new PubSub();

// RESOLVERS
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Restaurant from "./resolvers/Restaurant";
// import User from "./resolvers/User";
// import Subscription from "./resolvers/Subscription";
// import Vote from "./resolvers/Vote";

const resolvers = {
  Query,
  Mutation,
  Restaurant,
  // User,
  // Subscription,
  // Vote,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers: resolvers as any,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req?.headers?.authorization ? getUserId(req, null) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
