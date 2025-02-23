import {client} from "./index"

export async function createTravelPlan(
    userId:number, 
    title:string,
    destinationCity:string,
    destinationCountry:string,
    startDate:Date,
    endDate:Date,
    budget:number
){

    const query = "INSERT INTO travel_plan (userId, title, destinationCity, destinationCity, startDate, budget, budget) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;"
    const response =  await client.query(query, [userId, title, destinationCity, destinationCountry, startDate, endDate, budget])
    return response.rows[0];
}

export async function updateTravelPlan(planId:number, title?:string, budget?:number){
    const query = "UPDATE travel_plans SET title = COALESCE($2, title), budge = COALESCE($3, budget) WHERE id = $1"
    const response = await client.query(query, [planId, title, budget]);
    return response.rows[0];
}


export async function getTravelPlans(userId:number){
    const query = "SELECT * from travel_plans WHERE user_id = $1";
    const response = await client.query(query,[userId]);
    return response.rows[0];
}




















