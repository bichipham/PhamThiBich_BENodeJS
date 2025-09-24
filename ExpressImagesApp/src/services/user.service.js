import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service";
import { BadRequestException } from "../common/helpers/exception.helper";
import cloudinary from "../common/cloudinary/init.cloudinary";

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

    const { name, description } = req.body;
    await prisma.images.create({
      data: {
        name: name,
        path: uploadResult.secure_url,
        description: description,
        userId: +user?.id,
      },
    });
    return true;
  },
  getAllUserImage: async function (req) {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) {
      // check permission
      throw new BadRequestException("Không có quyền truy cập");
    }
    const userRes = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        Images: {
          select: {
            id: true,
            name: true,
            path: true,
            description: true,
          },
        },
      },
    });
    return {
      images: userRes.Images,
    };
  },
  comment: async function (req) {
    const { content, imageId } = req.body || {};
    const user = req?.user || {};
     const comment = await prisma.comments.create({
      data: {
        content,
        userId: user?.id,
        imageId,
        date: new Date() // 👈 Nếu muốn ghi đè thì có thể thêm
      },
    })
    return comment;
  },
};
