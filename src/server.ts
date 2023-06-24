import mongoose from "mongoose";
import app from "./app";
import config from "./config";

(async () => {
  await dbConnect();
  app.listen(config.PORT);
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
