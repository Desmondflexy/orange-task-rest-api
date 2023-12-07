"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const validators = __importStar(require("../validators"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validators.createTask.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: 'Bad request',
                    message: error.message
                });
            }
            const { title, description } = req.body;
            const task = yield prisma.tasks.create({
                data: {
                    title,
                    description,
                    status: 'pending',
                    createdAt: new Date(),
                }
            });
            return res.status(201).json({
                message: 'task created successfully',
                task
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    });
}
exports.createTask = createTask;
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield prisma.tasks.findMany();
            return res.json(tasks);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.getTasks = getTasks;
;
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const task = yield prisma.tasks.findUnique({
                where: { id }
            });
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.json(task);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.getTask = getTask;
;
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error } = validators.updateTask.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: 'Bad request',
                    message: error.message
                });
            }
            const { title, description, status } = req.body;
            const task = yield prisma.tasks.update({
                where: { id },
                data: {
                    title,
                    description,
                    status,
                }
            });
            return res.json({
                message: 'task updated successfully',
                task
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.updateTask = updateTask;
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const task = yield prisma.tasks.delete({
                where: { id }
            });
            return res.json({
                message: 'task deleted successfully',
                task
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.deleteTask = deleteTask;
