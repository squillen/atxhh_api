import { VoteResolvers } from "../../generated/graphql";

const Vote: VoteResolvers = {
  /**
   * @function restaurant - find specific vote by restaurant ID
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} unique vote
   */
  restaurant: (_parent, args, context, info) => {
    return context.prisma.vote
      .findUnique({ where: { id: _parent.id } })
      .restaurant();
  },
  /**
   * @function user - find specific vote by user ID
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} unique vote
   */
  user: (_parent, args, context, info) => {
    return context.prisma.vote.findUnique({ where: { id: _parent.id } }).user();
  },
};

export default Vote;
