import { UserResolvers } from "../../generated/graphql";

const User: UserResolvers = {
  /**
   * @function restaurants - get restaurants created by specific user
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} restaurants
   */
  restaurants: (_parent, args, context) => {
    return context.prisma.user
      .findUnique({ where: { id: _parent.id } })
      .restaurants();
  },
};

export default User;
