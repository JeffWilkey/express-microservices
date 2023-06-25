import express from "express";
import timestampMicroService from "./timestamp-microservice/api";
import whoAmIMicroService from "./whoami-microservice/api";
import urlShortenerMicroService from "./url-shortener-microservice/api";
import fileMetaDataMicroService from "./file-metadata-microservice/api";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/timestamp", timestampMicroService);
app.use("/api/whoami", whoAmIMicroService);
app.use("/api/url-shortener", urlShortenerMicroService);
app.use("/api/file-metadata", fileMetaDataMicroService);

export default app;
