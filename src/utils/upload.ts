import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
