import express from "express";
import { PrismaClient } from '@prisma/client';
const app = express();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
    const data = await prisma.user.findMany();
    console.log("Get request received");
    res.send({
        "message": "Get end point",
        data
    })

})
app.post("/", async (req, res) => {

    await prisma.user.create({
        data: {
            email: Math.random().toString(36).substring(2, 15) + "@example.com",
            name: Math.random().toString(36).substring(2, 15),
        }
    })
    res.send({
        "message": "Get end point"
    })

})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
