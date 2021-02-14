const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserID } = require("../utils");
import { MutationResolvers } from "../../generated/graphql";

const Mutation: MutationResolvers = {
  /**
   * @function signup - sign user up
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} AuthPayload
   */
  signup: async (_parent, args, context) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign({ userID: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  /**
   * @function login - log user in
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} AuthPayload
   */
  login: async (_parent, args, context) => {
    const user = await context.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userID: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  /**
   * @function create - user can create new restaurant
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} newly created restaurant (Restaurant)
   */
  create: async (_parent, args, context) => {
    const { userID } = context;

    const newRestaurant = await context.prisma.restaurant.create({
      data: {
        url: args.url,
        description: args.description,
        name: args.name,
        happyHourDays: args.happyHourDays,
        startTime: args.startTime,
        endTime: args.endTime,
        percentOffDrinks: args.percentOffDrinks,
        percentOffFood: args.percentOffFood,
        coordinates: args.coordinates,
        address: args.address,
        createdAt: new Date(),
        createdBy: { connect: { id: userID } },
      },
    });

    context.pubsub.publish("NEW_RESTAURANT", newRestaurant);
    return newRestaurant;
  },
  /**
   * @function vote - user can vote on restaurant
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} newly created vote (id / User / Restaurant)
   */
  vote: async (_parent, args, context) => {
    const userID = getUserID(context);

    const userAlreadyVotedOnRestaurant = await context.prisma.vote.findUnique({
      where: {
        restaurantID_userID: {
          userID,
          restaurantID: Number(args.restaurantID),
        },
      },
    });

    if (Boolean(userAlreadyVotedOnRestaurant)) {
      throw new Error(`Already voted for restaurant: ${args.restaurantID}`);
    }

    const newVote = context.prisma.vote.create({
      data: {
        user: { connect: { id: userID } },
        restaurant: { connect: { id: Number(args.restaurantID) } },
      },
    });

    context.pubsub.publish("NEW_VOTE", newVote);

    return newVote;
  },
};

export default Mutation;
