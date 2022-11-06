"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routers_1 = __importDefault(require("./routers"));
var app = (0, express_1.default)();
app.use(routers_1.default);
app.listen(process.env.PORT || 8080, function () { return console.log("listening 8080"); });
