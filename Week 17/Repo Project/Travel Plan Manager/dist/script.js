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
exports.createTable = createTable;
exports.dropTable = dropTable;
const index_1 = require("./index");
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(30) NOT NULL,
                name string NOT NULL
            );
        `);
        yield index_1.client.query(`
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
    });
}
function dropTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.client.query(`DROP TABLE IF EXISTS travel_plans;`);
        yield index_1.client.query('DROP TALBE IF EXISTS users;');
    });
}
