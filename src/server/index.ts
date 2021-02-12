import { ApolloServer, PubSub } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { getUserId } from "./utils";

const pubsub = new PubSub();

// RESOLVERS
const Query = require("./resolvers/Query");
// const Mutation = require("./resolvers/Mutation");
// const User = require("./resolvers/User");
// const Link = require("./resolvers/Link");
// const Subscription = require("./resolvers/Subscription");
// const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  // Mutation,
  // User,
  // Link,
  // Subscription,
  // Vote,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
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
