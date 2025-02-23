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
exports.createUser = createUser;
exports.getUser = getUser;
const _1 = require(".");
// Add user's info in users table
function createUser(username, password, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO users (username, password, name) VALUES($1, $2, $3)";
        const response = yield _1.client.query(query, [username, password, name]);
        return response.rows[0];
    });
}
// Get users based on Id
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE id = $1";
        const response = yield _1.client.query(query, [userId]);
        return response.rows[0];
    });
}
