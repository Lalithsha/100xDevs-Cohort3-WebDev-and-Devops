import { Client } from "pg";

// Way 1 to connect to db
const pgClient = new Client("postgresql://neondb_owner:*********@ep-young-cell-a8f1jqag-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")

// Way 2 to connect to db
const pgClinet2 = new Client({
    user:"neondb_owner",
    password:"*******",
    port:3000,
    host:"ep-young-cell-a8f1jqag-pooler.eastus2.azure.neon.tech",
    database:"neondb",
    ssl:true
})


const main = async ()=>{
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users");
    console.log(response.rows) 
}

main();