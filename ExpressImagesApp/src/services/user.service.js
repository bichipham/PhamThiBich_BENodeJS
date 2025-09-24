import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service";
import { BadRequestException } from "../common/helpers/exception.helper";

export const userService = {
  register: async function (req) {
    const { email, password, name } = req.body;
    const userExits = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (userExits)
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập"
      );

    const hashPassword = await bcrypt.hashSync(password, 10); // mã hóa mật khẩu

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        name: name,
      },
    });
    delete newUser.password;
    return newUser;
  },
  login: async function (req) {
    const { email, password } = req.body;
    const userExits = await prisma.users.findFirst({
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

    const tokens = tokenService.createTokens(userExits.id);

    console.log({ email, password });

    return tokens;
  },
  getInfo: async function (req) {
    delete req?.user?.password;
    return req.user;
  },
  uploadImage: async function (req) {
    console.log("file",req);
    if (!req.file) {
      throw new BadRequestException("Not found file");
    }

    const user = req.user;

   // đưa hình lên cloud
    const byteArrayBuffer = req.file.buffer;
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "socialapp" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });

    
    console.log(uploadResult.public_id);
    // await prisma.images.create({
    //   data: {
    //     name: imageName,
    //     path: uploadResult.public_id,
    //     description: 
    //     userId: req.user.id
    //   }
    // })

    console.log({ uploadResult });
    return true;
  },
};
