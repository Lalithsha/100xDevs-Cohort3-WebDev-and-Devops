"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTravelPlan = createTravelPlan;
exports.updateTravelPlan = updateTravelPlan;
exports.getTravelPlans = getTravelPlans;
const index_1 = require("./index");
function createTravelPlan(userId, title, destinationCity, destinationCountry, startDate, endDate, budget) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO travel_plan (userId, title, destinationCity, destinationCity, startDate, budget, budget) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;";
        const response = yield index_1.client.query(query, [userId, title, destinationCity, destinationCountry, startDate, endDate, budget]);
        return response.rows[0];
    });
}
function updateTravelPlan(planId, title, budget) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE travel_plans SET title = COALESCE($2, title), budge = COALESCE($3, budget) WHERE id = $1";
        const response = yield index_1.client.query(query, [planId, title, budget]);
        return response.rows[0];
    });
}
function getTravelPlans(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * from travel_plans WHERE user_id = $1";
        const response = yield index_1.client.query(query, [userId]);
        return response.rows[0];
    });
}
