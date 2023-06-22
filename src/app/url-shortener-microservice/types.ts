export interface UrlShortenerReq {
  url: string;
}

export interface ShortenedUrlQuery {
  originalUrl?: string;
  shortUrl?: number;
}

export interface ShortenedUrl {
  originalUrl: string;
  shortUrl: number;
}

export interface FindShortenedUrl {
  [key: string]: number | string;
}
