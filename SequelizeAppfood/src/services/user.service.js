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
  login: async function (req) {
    const { email, password } = req.body;

    const userExits = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExits)
      throw new BadRequestException(
        "Người dùng chưa tồn tại, vui lòng đăng ký"
      );

    if (!userExits.password) {
      throw new BadRequestException(
        "Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook), để cập nhật lại mật khẩu mới trong setting"
      );
    }

    const isPassword = bcrypt.compareSync(password, userExits.password); // true
    if (!isPassword) throw new BadRequestException("Mật khẩu không chính xác");

    const tokens = tokenService.createTokens(userExits.id);

    console.log({ email, password });

    return tokens;
  },
};
