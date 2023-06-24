import mongoose from "mongoose";
import request from "supertest";
import express from "express";

import api from "../api";
import config from "../../../config";

const app = express();
app.use(express.json());
app.use("/", api);

beforeEach(async () => {
  await mongoose.connect(config.DB_URL!);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("URL Shortener Microservice API", () => {
  test("POST / should return a response with correct properties", async () => {
    const req = {
      url: "freecodecamp.org",
    };
    const res = await request(app)
      .post("/")
      .send(req)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      originalUrl: req.url,
      shortUrl: 1,
    });
  });

  test("POST / should return correct error response when provided with an invalid URL", async () => {
    const req = {
      url: "invalidurl",
    };
    const res = await request(app)
      .post("/")
      .send(req)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "invalid url",
    });
  });

  test("GET /:shortUrl should return a shortened url if :shortUrl is valid", async () => {
    const res = await request(app).get("/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      originalUrl: "freecodecamp.org",
      shortUrl: 1,
    });
  });
});
