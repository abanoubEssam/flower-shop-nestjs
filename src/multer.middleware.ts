import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

const storage = diskStorage({
  destination: './uploads'
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new BadRequestException('sorry this is not image'));
  }
};

export const upload = ({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
