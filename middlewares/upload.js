import multer from "multer";
import path from "path";
// import HttpError from "../helpers/HttpError.js";

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: multerConfig
})

export default upload;


// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//   destination,
//   filename(req, file, cb) {
//     const prefix = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
//     const filename = `${prefix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const extention = file.originalname.split(".").pop();
//   if (extention === "exe") {
//     return cb(HttpError(400, ".exe extention is not allowed"));
//   }
//   cb(null, true);
// };

// const upload = multer({
//     storage,
//     fileFilter,
// });

// export default upload;