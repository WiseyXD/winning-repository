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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = exports.loginSchema = exports.signupSchema = void 0;
const z = __importStar(require("zod"));
exports.signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be characters long"),
});
exports.loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be characters long"),
});
const optionSchema = z.object({
    text: z.string(),
    right: z.boolean().optional(),
});
const questionSchema = z.object({
    text: z.string(),
    options: z.array(optionSchema),
});
exports.testSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
    questions: z.array(questionSchema),
});
