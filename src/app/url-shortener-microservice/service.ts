import dns from "dns";
import { UrlShortenerReq } from "./types";
import { ShortenedUrl, IShortenedUrl } from "./model";

export const getUrl = async (query: any) => {
  const result = await ShortenedUrl.findOne(query);

  return result?.serialize();
};

export const createUrl = async (
  data: UrlShortenerReq
): Promise<IShortenedUrl> => {
  const existingUrl = await ShortenedUrl.findOne({
    $or: [{ originalUrl: data.url }, {}],
  }).sort({ shortUrl: -1 });

  if (existingUrl?.originalUrl === data.url) return existingUrl.serialize();

  const shortenedUrl = await ShortenedUrl.create({
    originalUrl: data.url,
    shortUrl: existingUrl?.shortUrl ? existingUrl.shortUrl + 1 : 1,
  });

  return shortenedUrl.serialize();
};

export const dnsLookup = async (hostname: string) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) reject("invalid url");
      resolve(address);
    });
  });
};
