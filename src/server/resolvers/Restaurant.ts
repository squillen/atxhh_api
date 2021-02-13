import { RestaurantResolvers } from "../../generated/graphql";

const Restaurant: RestaurantResolvers = {
  /**
   * @function postedBy - get restaurants created by specific user
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} restaurants, count
   */
  postedBy: (_parent, args, context) => {
    return context.prisma.restaurant
      .findUnique({ where: { id: _parent.id } })
      .postedBy();
  },
  /**
   * @function votes - get votes from specific user
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} restaurants, count
   */
  votes: (_parent, args, context) => {
    return context.prisma.restaurant
      .findUnique({ where: { id: _parent.id } })
      .votes();
  },
};

export default Restaurant;
