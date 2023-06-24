import { Schema, model } from "mongoose";

export interface IShortenedUrl {
  originalUrl: string;
  shortUrl: number;
}

const schema = new Schema<IShortenedUrl>({
  originalUrl: { type: String, required: true, unique: true },
  shortUrl: { type: Number, required: true, unique: true },
});

export const ShortenedUrl = model<IShortenedUrl>("ShortenedUrl", schema);
