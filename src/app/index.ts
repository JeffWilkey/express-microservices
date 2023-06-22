import express from "express";
import timestampMicroService from "./timestamp-microservice/api";
import whoAmIMicroService from "./whoami-microservice/api";
import urlShortenerMicroService from "./url-shortener-microservice/api";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/timestamp-microservice", timestampMicroService);
app.use("/api/whoami", whoAmIMicroService);
app.use("/api/url-shortener", urlShortenerMicroService);

export default app;
