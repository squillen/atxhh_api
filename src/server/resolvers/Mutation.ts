const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
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
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

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

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  /**
   * @function create - user can create new link
   * @param {object} _parent
   * @param {object} args
   * @param {object} context
   * @returns {object} newly created link (Link)
   */
  create: async (_parent, args, context) => {
    const { userId } = context;

    const newRestaurant = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        createdAt: new Date(),
        postedBy: { connect: { id: userId } },
      },
    });

    context.pubsub.publish("NEW_LINK", newRestaurant);
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
    const userId = getUserId(context);

    const userAlreadyVotedOnLink = await context.prisma.vote.findUnique({
      where: {
        linkId_userId: {
          userId,
          linkId: Number(args.restaurantID),
        },
      },
    });

    if (Boolean(userAlreadyVotedOnLink)) {
      throw new Error(`Already voted for link: ${args.restaurantID}`);
    }

    const newVote = context.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.restaurantID) } },
      },
    });

    context.pubsub.publish("NEW_VOTE", newVote);

    return newVote;
  },
};

export default Mutation;
