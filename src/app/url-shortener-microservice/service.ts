import dns from "dns";
import { UrlShortenerReq } from "./types";
import { ShortenedUrl, IShortenedUrl } from "./model";

export const getUrl = async (query: any) => {
  const result = await ShortenedUrl.findOne(query);

  console.log(result);

  return result;
};

export const createUrl = async (data: UrlShortenerReq) => {
  const existingUrl = await ShortenedUrl.findOne({
    $or: [{ originalUrl: data.url }, {}],
  }).sort({ shortUrl: -1 });

  if (existingUrl?.originalUrl === data.url) return existingUrl;

  return ShortenedUrl.create({
    originalUrl: data.url,
    shortUrl: existingUrl?.shortUrl ? existingUrl.shortUrl + 1 : 1,
  });
};

export const dnsLookup = async (hostname: string) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) reject("invalid url");
      resolve(address);
    });
  });
};
