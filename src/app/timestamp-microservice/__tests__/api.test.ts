import request from "supertest";
import express from "express";
import api from "../api";

const app = express();
app.use("/", api);

describe("Timestamp Microservice API", () => {
  test("GET /:date should return a correctly formatted timestamp", async () => {
    const res = await request(app).get("/2023-01-01");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      unix: 1672531200000,
      utc: "Sun, 01 Jan 2023 00:00:00 GMT",
    });
  });

  test("GET /:date should return a correctly formatted timestamp when passed a unix value", async () => {
    const res = await request(app).get("/1451001600000");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      unix: 1451001600000,
      utc: "Fri, 25 Dec 2015 00:00:00 GMT",
    });
  });

  test("GET /:date should return an error when passed an invalid date", async () => {
    const res = await request(app).get("/invalid-date");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Invalid Date",
    });
  });
});
