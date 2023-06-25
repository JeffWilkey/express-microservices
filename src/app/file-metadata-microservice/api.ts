import multer from "multer";
import { Router } from "express";

const upload = multer();
const api = Router();

api.post("/", upload.single("file"), (req, res) => {
  try {
    if (req.file) {
      res.status(200).json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      });
    } else {
      res.status(422).json({ error: "file required to provide metadata" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default api;
