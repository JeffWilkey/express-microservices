import request from "supertest";
import express from "express";
import api from "../api";

const app = express();
app.use("/", api);

describe("WhoAmI Microservice", () => {
  test("GET / should return a correctly formatted response", async () => {
    const headers = {
      "Accept-Language": "en-US,en;q=0.5",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
    };
    const res = await request(app).get("/").set(headers);

    expect(res.status).toBe(200);
    expect(res.body.ipaddress).toBeDefined();
    expect(res.body.language).toEqual(headers["Accept-Language"]);
    expect(res.body.software).toEqual(headers["User-Agent"]);
  });
});
