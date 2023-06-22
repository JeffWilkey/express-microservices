import dns from "dns";
import { ShortenedUrlQuery, UrlShortenerReq } from "./types";
import { findOneShortenedUrl, createShortenedUrl } from "./data-access";

export const getUrl = (query: ShortenedUrlQuery) => {
  return findOneShortenedUrl(query);
};

export const createUrl = (data: UrlShortenerReq) => {
  const existingUrl = findOneShortenedUrl({ originalUrl: data.url });

  if (existingUrl) return existingUrl;

  return createShortenedUrl({ originalUrl: data.url });
};

export const dnsLookup = async (hostname: string) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) reject("invalid url");
      resolve(address);
    });
  });
};
