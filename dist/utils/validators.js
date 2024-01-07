"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = exports.isValid = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongodb_1 = require("mongodb");
function isValid(data) {
    return lodash_1.default.isEqual(data, {
        title: data === null || data === void 0 ? void 0 : data.title,
        value: data === null || data === void 0 ? void 0 : data.value,
        type: data === null || data === void 0 ? void 0 : data.type,
        category: data === null || data === void 0 ? void 0 : data.category,
    });
}
exports.isValid = isValid;
function isValidId(id) {
    return mongodb_1.ObjectId.isValid(id) && new mongodb_1.ObjectId(id).toString() === id;
}
exports.isValidId = isValidId;
