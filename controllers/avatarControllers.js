import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import path from "path";
import * as fs from "fs/promises";
import User from "../models/user.js";
import Jimp from "jimp";

const avatarsDir = path.resolve("public", "avatars");
console.log(avatarsDir);

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}_250`;

  const avatar = await Jimp.read(tmpUpload);
    await avatar.cover(250, 250).writeAsync(tmpUpload);

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  
  console.log(avatarURL);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  uploadAvatar: ctrlWrapper(uploadAvatar),
};