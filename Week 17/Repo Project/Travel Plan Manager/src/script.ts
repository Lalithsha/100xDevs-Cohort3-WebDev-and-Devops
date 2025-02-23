import {client} from "./index"

export async function createTable (){

    await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(30) NOT NULL,
                name string NOT NULL
            );
        `);

    await client.query(`
            CREATE TABLE IF NOT EXISTS travel_plans(
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id,)
                title TEXT NOT NULL,
                destination_city TEXT NOT NULL,
                destination_country TEXT NOT NULL,
                start_date DATE NOT NULL DEFAULT CURRENT_DATE
                end_date DATE NOT NULL DEFAULT CURRENT_DATE
                budget NUMERIC
            );
        `);   
        
}

export async function dropTable(){

    await client.query(`DROP TABLE IF EXISTS travel_plans;`);
    await client.query('DROP TALBE IF EXISTS users;');
    
}













