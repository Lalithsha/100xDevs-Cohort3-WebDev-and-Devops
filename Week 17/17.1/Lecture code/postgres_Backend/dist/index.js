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
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_di7Xg0kUsxec@ep-young-cell-a8f1jqag-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
const pgClinet2 = new pg_1.Client({
    user: "neondb_owner",
    password: "npg_di7Xg0kUsxec",
    port: 3000,
    host: "ep-young-cell-a8f1jqag-pooler.eastus2.azure.neon.tech",
    database: "neondb",
    ssl: true
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pgClient.connect();
    const response = yield pgClient.query("SELECT * FROM users");
    console.log(response.rows);
});
main();
