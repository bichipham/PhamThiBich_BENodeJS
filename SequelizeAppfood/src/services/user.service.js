import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service";
import { BadRequestException } from "../common/helpers/exception.helper";

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
  register: async function (req) {
    const { email, password, fullName } = req.body;
    const userExits = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExits)
      throw new BadRequestException("Người dùng đã tồn tại, vui lòng đăng nhập");

    const hashPassword = await bcrypt.hashSync(password, 10); // mã hóa mật khẩu

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        full_name: fullName,
      },
    });
    delete newUser.password;
    return newUser;
  },
  login: async function (req) {
    const { email, password } = req.body;
    const userExits = await prisma.user.findFirst({
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
    const isPassword = await bcrypt.compareSync(password, userExits.password); // true
    if (!isPassword) throw new BadRequestException("Mật khẩu không chính xác");

    const tokens = tokenService.createTokens(userExits.user_id);

    console.log({ email, password });

    return tokens;
  },
};
