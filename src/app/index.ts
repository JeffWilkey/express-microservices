import express from "express";
import timestampMicroService from "./timestamp-microservice/api";

const app = express();

app.use("/api/timestamp-microservice", timestampMicroService);

export default app;
