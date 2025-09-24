import prisma from "../common/prisma/init.prisma";

export const imageService = {
  findAll: async function (req) {
    let { page, size, keyword } = req.query;
    page = +page > 0 ? +page : 1;
    size = +size > 0 ? +size : 1;

    const index = (page - 1) * size;

    const imagesPromise = prisma.images.findMany({
      // SQL: OFFSET
      skip: index,
      // SQL: LIMIT
      take: size,
      where: keyword
        ? {
            name: {
              contains: keyword,
            },
          }
        : {}, // nếu undefined thì không filter
    });

    // đếm số lượng row hàng trong table
    const totalItemPromise = prisma.images.count();

    const [images, totalItem] = await Promise.all([
      imagesPromise,
      totalItemPromise,
    ]);

    const totalPage = Math.ceil(totalItem / size);

    return {
      page,
      size,
      totalItem: totalItem,
      totalPage: totalPage,
      items: images || [],
    };
  },
  findOne: async function (req) {
    const imageInfo = await prisma.images.findUnique({
      where: { id: +req?.params?.id },
      include: {
        Users: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
    });

    return imageInfo;
  },
};
