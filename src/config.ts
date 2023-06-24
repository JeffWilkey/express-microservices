import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_URL:
    process.env.NODE_ENV === "test"
      ? process.env.DB_URL_TEST
      : process.env.DB_URL,
};
