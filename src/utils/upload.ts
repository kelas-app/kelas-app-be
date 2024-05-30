import multer from "multer";

const storage = multer.memoryStorage(); // Simpan file di memori sementara sebelum diupload ke bucket

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(
      new Error("Invalid file type. Only image files are allowed."),
      false
    );
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;