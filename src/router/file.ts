import express, { response } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'upload/',
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});
const upload = multer({ storage });
const fileRouter = express.Router();

fileRouter.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send(req.file.filename);
  }
});

export default fileRouter;
