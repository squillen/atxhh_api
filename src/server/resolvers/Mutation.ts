const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserID } = require('../utils');
import { ADMIN } from '../helpers/constants';
import { MutationResolvers } from '../../generated/graphql';

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
		const token = jwt.sign(
			{ userID: user.id, userRole: user.role },
			APP_SECRET
		);

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
			throw new Error('No such user found');
		}

		const valid = await bcrypt.compare(args.password, user.password);
		if (!valid) {
			throw new Error('Invalid password');
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
				whatToGoFor: args.whatToGoFor,
				cuisine: args.cuisine,
				price: args.price,
				rating: args.rating,
				image: args.image,
				when: args.when,
				menu: args.menu,
				percentOffDrinks: args.percentOffDrinks,
				percentOffFood: args.percentOffFood,
				coordinates: args.coordinates,
				address: args.address,
				createdAt: new Date(),
				createdBy: { connect: { id: userID } },
			},
		});

		context.pubsub.publish('NEW_RESTAURANT', newRestaurant);
		return newRestaurant;
	},
	/**
	 * @function deleteRestaurant - delete restaurant
	 * @param {object} _parent
	 * @param {object} args
	 * @param {object} context
	 * @returns {boolean} deletion result
	 */
	deleteRestaurant: async (_parent, args, context) => {
		const { userRole } = context;
		let success = false;

		if (userRole === ADMIN) {
			try {
				await context.prisma.restaurant.delete({
					where: { id: +args.id },
				});
				success = true;
			} catch (e) {
				console.error(e);
			}
		}
		return { success };
	},
	/**
	 * @function updateRestaurant - update restaurant
	 * @param {object} _parent
	 * @param {object} args
	 * @param {object} context
	 * @returns {boolean && Restaurant} update result and updated Restaurant
	 */
	updateRestaurant: async (_parent, args, context) => {
		const { userRole } = context;
		let success = false;
		let restaurant;
		const { id, data } = args;
		if (userRole === ADMIN || data.warnings) {
			try {
				restaurant = await context.prisma.restaurant.update({
					where: { id: +id },
					data,
				});
				success = true;
			} catch (e) {
				console.error(e);
			}
		}
		return { success, restaurant };
	},

	/**
	 * @function deleteUser - delete user
	 * @param {object} _parent
	 * @param {object} args
	 * @param {object} context
	 * @returns {boolean} deletion result
	 */
	deleteUser: async (_parent, args, context) => {
		const { userRole, userID } = context;
		let success = false;
		if (userRole === ADMIN || userID === args.id) {
			try {
				await context.prisma.user.delete({
					where: { id: +args.id },
				});
				success = true;
			} catch (e) {
				console.error(e);
			}
		}
		return { success };
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

		context.pubsub.publish('NEW_VOTE', newVote);

		return newVote;
	},
};

export default Mutation;
