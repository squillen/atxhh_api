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
		const filter = args.filter;
		const where = filter
			? {
					OR: [
						{ description: { contains: filter } },
						{ url: { contains: filter } },
					],
			  }
			: {};
		const restaurants = context.prisma.restaurant.findMany({
			where,
			skip: args.skip,
			take: args.take,
			orderBy: args.orderBy,
		});
		const count = await context.prisma.restaurant.count({ where });
		return { restaurants, count };
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
