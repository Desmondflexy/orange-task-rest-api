"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTask = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTask = joi_1.default.object().keys({
    title: joi_1.default.string().required().max(50),
    description: joi_1.default.string().required().max(255),
});
exports.updateTask = joi_1.default.object().keys({
    title: joi_1.default.string().max(50),
    description: joi_1.default.string().max(255),
    status: joi_1.default.string().valid('pending', 'completed'),
});
