import fs from "fs";
import { ShortenedUrl, ShortenedUrlQuery } from "./types";

const dataFilePath = "data/url-shortener.json";
const dataFile = fs.readFileSync(dataFilePath, "utf-8");
const json: ShortenedUrl[] = JSON.parse(dataFile);

export const findOneShortenedUrl = (query: ShortenedUrlQuery) => {
  let foundUrl;

  for (const [key, value] of Object.entries(query)) {
    for (const url of json) {
      for (const [key1, value1] of Object.entries(url)) {
        if (key === key1 && value === value1) {
          foundUrl = url;
        }
      }
    }
  }

  return foundUrl;
};

export const createShortenedUrl = (data: Omit<ShortenedUrl, "shortUrl">) => {
  const lastShortUrl = json[json.length - 1]?.shortUrl;

  const newShortenedUrl: ShortenedUrl = {
    originalUrl: data.originalUrl,
    shortUrl: lastShortUrl ? lastShortUrl + 1 : 1,
  };
  json.push(newShortenedUrl);

  fs.writeFileSync(dataFilePath, JSON.stringify(json));

  return newShortenedUrl;
};
