import { PrismaClient } from "@prisma/client";
import express, { json } from "express";
const client = new PrismaClient();

const app = express();

// Basic code to add, find user. 
async function createUser(){    
    await client.user.create({
        data:{
            username:"Lalith sharma",
            password:"12341234",
            age: 22,
            city:"Chennai"
        }
    })
}

async function findUser(){
    const user= await client.user.findFirst({
        where:{
            id:1
        }
    })

    console.log(user)
    
}

async function getUser(){
    const user = await client.user.findFirst({
        where:{
            id:1
        },
        include:{
            todos:true
        }
    })
    
    console.log(user)
    
}

// createUser();
// findUser();
// getUser();


app.get("/users", async(req,res)=>{
    const users = await client.user.findMany();
    res.json({
        users
    })
})

app.get("/todos/:id", async(req,res)=>{
    const id = req.params.id;
    const users = await client.user.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            todos: true
        }
    })
    res.json({
        users
    })
})

app.listen(3000);