import { Router } from "express";

const api = Router();

api.get("/", (req, res) => {
  res.status(200).json({
    ipaddress: req.socket.remoteAddress,
    software: req.headers["user-agent"],
    language: req.headers["accept-language"],
  });
});

export default api;
