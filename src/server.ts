import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

(async () => {
  await dbConnect();
  server = app.listen(config.PORT);

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
})();

async function dbConnect() {
  try {
    await mongoose.connect(config.DB_URL!);
    console.log("MongoDB: Client Connected");
  } catch (error) {
    console.error("MongoDB: Client Connection Failed", error);
    throw new Error(error as any);
  }
}

async function cleanup() {
  try {
    server.close(async () => {
      console.log("Closed out remaining connections.");
      await mongoose.connection.close();
      process.exit();
    });

    setTimeout(() => {
      console.error("Could not close connections in time, forcing shut down");
      process.exit(1);
    }, 30 * 1000);
  } catch (error) {
    console.error("Cleanup Failed: ", error);
  }
}
