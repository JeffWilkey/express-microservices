import { Router } from "express";
import { UrlShortenerReq } from "./types";
import { getUrl, createUrl, dnsLookup } from "./service";

const api = Router();

api.post("/", async (req, res) => {
  try {
    const data: UrlShortenerReq = req.body;
    // Verify url exists
    await dnsLookup(data.url);

    // Create
    const newUrl = createUrl(data);

    res.status(201).json(newUrl);
  } catch (error) {
    if (error === "invalid url") {
      res.status(400).json({ error });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
api.get("/:id", async (req, res) => {
  try {
    const url = getUrl({ shortUrl: parseInt(req.params.id) });

    if (url) res.status(200).json(url);
    else res.status(404).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default api;
