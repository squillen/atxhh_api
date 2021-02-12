// export default async function feed(parent, args, context, info) {
//   const filter = args.filter;
//   const where = filter
//     ? {
//         OR: [
//           { description: { contains: filter } },
//           { url: { contains: filter } },
//         ],
//       }
//     : {};
//   const links = context.prisma.link.findMany({
//     where,
//     skip: args.skip,
//     take: args.take,
//     orderBy: args.orderBy,
//   });
//   const count = await context.prisma.link.count({ where });
//   return { links, count };
// }
