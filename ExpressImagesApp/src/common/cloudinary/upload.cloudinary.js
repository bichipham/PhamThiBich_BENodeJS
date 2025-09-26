import cloudinary from "./init.cloudinary";
const uploadCloudDinary = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    // đưa hình lên cloud
    const byteArrayBuffer = file.buffer;
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: folder }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });
    return resolve(uploadResult);
  });
};

export {
    uploadCloudDinary
}
