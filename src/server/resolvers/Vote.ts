import { VoteResolvers } from "../../generated/graphql";

const Vote: VoteResolvers = {
  restaurant: (parent, args, context, info) => {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
  },
  user: (parent, args, context, info) => {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
  },
};

export default Vote;
