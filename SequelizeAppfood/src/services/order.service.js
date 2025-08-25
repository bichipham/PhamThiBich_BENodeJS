import prisma from "../common/prisma/init.prisma";

export const orderService = {
  create: async function (req) {
    const { userId, foodId, amount, arrSub } = req.body;
    const order = await prisma.order.create({
      data: {
        user_id: userId,
        food_id: foodId,
        amount: amount,
        date_order: new Date(),
        sub_orders: arrSub,
      },
    });
    return order;
  },

  findAll: async function (req) {
		const orders = await prisma.order.findMany();
		return orders;
  },
};
