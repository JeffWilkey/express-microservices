import { Router } from "express";
import { getTimestamp } from "./services";

const api = Router();

api.get("/:date", (req, res) => {
  try {
    const date = req.params.date;
    const result = getTimestamp(date);

    if (!result.error) res.status(200).json(result);
    else res.status(400).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default api;
