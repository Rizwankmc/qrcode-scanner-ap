import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://rizwankmc.github.io", "https://qrcode-scanner.github.io"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port =>", process.env.PORT);
});
