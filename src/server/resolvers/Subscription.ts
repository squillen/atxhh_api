import { SubscriptionResolvers } from "../../generated/graphql";

const Subscription: SubscriptionResolvers = {
  /**
   * @function newRestaurant - pubsub for newly created restaurants
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} subscription and resolver payload
   */
  newRestaurant: {
    subscribe: (_parent, args, context) => {
      return context.pubsub.asyncIterator("NEW_LINK");
    },
    resolve: (payload: unknown) => {
      return payload;
    },
  },
    /**
   * @function newVote - pubsub for new votes
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} subscription and resolver payload
   */
  newVote: {
    subscribe: (_parent, args, context) => {
      return context.pubsub.asyncIterator("NEW_VOTE");
    },
    resolve: (payload: unknown) => {
      return payload;
    },
  },
};

export default Subscription;
