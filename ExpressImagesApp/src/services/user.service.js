import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service";
import { BadRequestException } from "../common/helpers/exception.helper";
import { uploadCloudDinary } from "../common/cloudinary/upload.cloudinary";

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

   const uploadCloudRes = await uploadCloudDinary(req.file, "socialapp");

    const { name, description } = req.body;
    await prisma.images.create({
      data: {
        name: name,
        path: uploadCloudRes.secure_url,
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
  deleteImage: async function (req) {
    const imageId = +req?.params?.id;
    const userId = req?.user?.id;

    const image = await prisma.images.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      throw new BadRequestException("Image not found");
    }
    if (image.userId !== userId) {
      throw new BadRequestException("You do not have permission to delete this image");
    }

    // Xoá các comment liên quan đến hình ảnh
    await prisma.comments.deleteMany({
      where: { imageId: imageId },
    });

    //xoá trên cloudinary
    const publicId = image.path.split('/').pop().split('.')[0]; // Lấy public_id từ URL
    await cloudinary.uploader.destroy(`socialapp/${publicId}`);

    // Xoá hình ảnh
    await prisma.images.delete({
      where: { id: imageId },
    });

    return true;
  },
  saveImage: async function (req) {
    const imageId = +req?.params?.id;
    const userId = req?.user?.id;

    const image = await prisma.images.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      throw new BadRequestException("Image not found");
    }

    const existingSavedImage = await prisma.saveImageRecord.findFirst({
      where: {
        userId: userId,
        imageId: imageId,
      },
    });

    if (existingSavedImage) {
      // lưu rồi thì update isSave
      await prisma.saveImageRecord.update({
        where: { userId_imageId: { userId, imageId } },
        data: { isSave: !existingSavedImage.isSave },
      });
      return true;
    }

    const savedImage = await prisma.saveImageRecord.create({
      data: {
        userId: userId,
        imageId: imageId,
        date: new Date(),
        isSave: true,
      },
    });

    return savedImage;
  },
  getSavedImage: async function (req) {
    const userId = req?.user?.id;

    const savedImages = await prisma.saveImageRecord.findMany({
      where: { userId: userId, isSave: true },
      include: {
        Images: true, // bao gồm thông tin hình ảnh
      },
      orderBy: {
        date: 'desc', // sắp xếp theo ngày lưu gần nhất
      },
    });
    return savedImages;
  },
  updateProfile: async function (req) {
    const userEmail = req?.user?.email;
    const avatar = req?.file;
    const { name, age } = req.body;

    if (!avatar) {
      // update profile without avatar
      const updatedUser = await prisma.users.update({
        where: { email: userEmail },
        data: {
          name,
          age,
        },
      });
      updatedUser.delete("password");
      return updatedUser;
    }

   const uploadCloudRes = await uploadCloudDinary(req.file, "socialapp/avatars");
   const updatedUser = await prisma.users.update({
      where: { email: userEmail },
      data: {
        name,
        age: age ? +age : null,
        avatar: uploadCloudRes.secure_url,
      },
    });
    updatedUser.delete("password");
    return updatedUser;
  },
};
