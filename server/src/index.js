import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { FirstName, LastName, Email, UserName, Password } = req.body;
    const user = await prisma.user.create({
      data: {
        FirstName,
        LastName,
        Email,
        UserName,
        Password,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Unable to create user",message:error.message,success:false });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
