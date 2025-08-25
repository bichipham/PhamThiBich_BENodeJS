import prisma from "../common/prisma/init.prisma";

export const restaurantService = {
	findAll: async function (req) {
		const allRes = await prisma.like_res.findMany();
		return allRes;
	},
  toggleLike: async function (req) {
    const { userId, resId } = req.body;
    const existingLike = await prisma.like_res.findFirst({
      where: {
        user_id: userId,
				res_id: resId,
      },
    });

    if (existingLike) {
      // Nếu đã tồn tại, thì toggle
      const updated = await prisma.like_res.update({
        where: { id: existingLike.id },
        data: { isLike: !existingLike.isLike },
      });
      return  updated;
    } else {
      // Nếu chưa có record thì tạo mới với isLike = true
      const created = await prisma.like_res.create({
        data: { user_id: userId, res_id: resId, isLike: true },
      });
      return created;
    }
  },
	getLikeByRes: async function (req) {
		const { id } = req.params;
		const likes = await prisma.like_res.findMany({
			where: {
				res_id: +id,
				isLike: true,
			},
		});
		return {
			count: likes.length,
			likes: likes,
			resId: id
		}
	},
	getLikeByUser: async function (req) {
		const { id } = req.params;
		const likes = await prisma.like_res.findMany({
			where: {
				user_id: +id,
				isLike: true,
			},
		});
		return {
			count: likes.length,
			likes: likes,
			userId: id
		}
	},
	addRate: async function (req) {
		const { userId, resId, rate } = req.body;
		const newRate = await prisma.rate_res.create({
			data: {
				user_id: userId,
				res_id: resId,
				amount: rate,
				date_rate: new Date()
			}
		});
		return newRate;
	},
	getRateByRes: async function (req) {
		const { id } = req.params;
		const rates = await prisma.rate_res.findMany({
			where: {
				res_id: +id,
			},
		});
		return {
			count: rates.length,
			rates: rates,
			resId: id
		}
	},
	getRateByUser: async function (req) {
		const { id } = req.params;
		const rates = await prisma.rate_res.findMany({
			where: {
				user_id: +id,
			},
		});
		return {
			count: rates.length,
			rates: rates,
			userId: id
		}
	}
};
