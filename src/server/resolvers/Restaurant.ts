import { RestaurantResolvers } from "../../generated/graphql";

const Restaurant: RestaurantResolvers = {
  /**
   * @function createdBy - get restaurants created by specific user
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} restaurants, count
   */
  createdBy: (_parent, args, context) => {
    return context.prisma.restaurant
      .findUnique({ where: { id: _parent.id } })
      .createdBy();
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
