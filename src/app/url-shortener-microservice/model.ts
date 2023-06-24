import { Model, Schema, model } from "mongoose";

export interface IShortenedUrl {
  originalUrl: string;
  shortUrl: number;
}

interface IShortenedUrlMethods {
  serialize(): IShortenedUrl;
}

export type ShortenedUrlModel = Model<IShortenedUrl, {}, IShortenedUrlMethods>;

const schema = new Schema<
  IShortenedUrl,
  ShortenedUrlModel,
  IShortenedUrlMethods
>({
  originalUrl: { type: String, required: true, unique: true },
  shortUrl: { type: Number, required: true, unique: true },
});

schema.method("serialize", function serialize() {
  return {
    originalUrl: this.originalUrl,
    shortUrl: this.shortUrl,
  };
});

export const ShortenedUrl = model<IShortenedUrl, ShortenedUrlModel>(
  "ShortenedUrl",
  schema
);
