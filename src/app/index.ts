import express from "express";
import timestampMicroService from "./timestamp-microservice/api";
import whoAmIMicroService from "./whoami-microservice/api";
const app = express();

app.use("/api/timestamp-microservice", timestampMicroService);
app.use("/api/whoami", whoAmIMicroService);

export default app;
