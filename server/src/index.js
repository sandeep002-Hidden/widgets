import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "../route/user.router.js";
import connect from "../db/dbConfig.js";
dotenv.config();
await connect()
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("Error in db");
  });
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", UserRouter);
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
