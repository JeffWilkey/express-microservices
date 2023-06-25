import path from "path";
import request from "supertest";
import express from "express";
import api from "../api";

const app = express();

app.use("/", api);

describe("File Metadata Microservice", () => {
  test("POST / should return a correctly formatted response", async () => {
    const img = path.resolve(__dirname + "/fry-test.jpg");
    const res = await request(app).post("/").attach("file", img);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("fry-test.jpg");
    expect(res.body.type).toBe("image/jpeg");
    expect(res.body.size).toBe(640254);
  });
});
