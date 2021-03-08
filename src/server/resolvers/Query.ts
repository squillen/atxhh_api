import { QueryResolvers } from '../../generated/graphql';

const Query: QueryResolvers = {
	/**
	 * @function restaurants - get restaurants from DB with filter option
	 * @param {object} _parent
	 * @param {object} args
	 * @param {object} context
	 * @returns {object} restaurants, count
	 */
	restaurants: async (_parent, args, context) => {
		try {
			const where = Object.keys(args).length
				? {
						AND: [
							{ happyHourDays: { hasSome: args.happyHourDays } },
							{ rating: { in: args.rating } },
							{ whatToGoFor: { hasSome: args.whatToGoFor } },
							{ cuisine: { hasSome: args.cuisines } },
							{ price: { in: args.prices } },
						],
				  }
				: {};
			const results = await context.prisma.restaurant.findMany({
				where,
				skip: args.skip,
				take: args.take,
				orderBy: args.orderBy,
			});
			const count = results.length;
			return { results, count };
		} catch (e) {
			console.error(e)
			throw new Error(e);
		}
	},
	/**
	 * @function currentUser - get currentUser
	 * @param {object} _parent
	 * @param {object} args
	 * @param {object} context
	 * @returns {object} User
	 */
	currentUser: async (_parent, args, context) => {
		try {
			return await context.prisma.user.findUnique({ where: { id: args.id } });
		} catch (e) {
			console.error(e);
			return null;
		}
	},
};

export default Query;
