import dotenv from "dotenv";
import connectDatabase from "./db/db.js";
import app from "./app.js";

dotenv.config({ path: ".env" });

const port = Number(process.env.PORT || 8000);

const start = async () => {
  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on("error", (error) => {
    if (error?.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Stop the other backend process before starting a new one.`);
      process.exitCode = 1;
      return;
    }

    console.error("Backend server error:", error);
    process.exitCode = 1;
  });
};

start().catch((error) => {
  console.error("Failed to start GrowTyping backend:", error);
  process.exitCode = 1;
});
