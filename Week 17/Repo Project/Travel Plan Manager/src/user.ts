import { client } from ".";

// Add user's info in users table
export async function createUser(username:string, password: string, name:string){
    const query = "INSERT INTO users (username, password, name) VALUES($1, $2, $3)";
    const response = await client.query(query,[username, password, name]);
    return response.rows[0];
}

// Get users based on Id
export async function getUser(userId:number){
    const query = "SELECT * FROM users WHERE id = $1"
    const response = await client.query(query, [userId]);
    return response.rows[0];
}

