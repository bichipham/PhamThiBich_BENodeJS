import prisma from "../common/prisma/init.prisma";

export const userService = {
  order: async function (req) {
    const { userId, foodId, amount, arrSub } = req.body;
    const order = await prisma.order.create({
      data: {
        user_id: +userId,
        food_id: foodId,
        amount,
        arr_sub_id: arrSub,
      },
    });
    return order;
  },

};
