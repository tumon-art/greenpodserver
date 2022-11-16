"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rss_to_json_1 = require("rss-to-json");
var router = express_1.default.Router();
// FETCH
var theFirstsRss;
var onePathRss;
// HEAD
var thefirstsHead;
var onePathHead;
function fetchTheFirsts() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, rss_to_json_1.parse)("https://feeds.buzzsprout.com/1194665.rss")];
                case 1:
                    res = _a.sent();
                    theFirstsRss = res;
                    thefirstsHead = __assign({}, res);
                    thefirstsHead.items = [];
                    return [2 /*return*/];
            }
        });
    });
}
fetchTheFirsts();
function fetchOnePath() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, rss_to_json_1.parse)("https://feeds.buzzsprout.com/2042303.rss")];
                case 1:
                    res = _a.sent();
                    onePathRss = res;
                    onePathHead = __assign({}, res);
                    onePathHead.items = [];
                    return [2 /*return*/];
            }
        });
    });
}
fetchOnePath();
router.get("/thefirstshead", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (theFirstsRss) {
                // SENT FORM CACHED
                console.log(["/THEFIRSTSHEAD - SENT FROM CACHE"]);
                res.status(200).json({ data: thefirstsHead });
            }
            else {
                fetchTheFirsts();
                if (theFirstsRss)
                    res.status(200).json({ data: thefirstsHead });
            }
        }
        catch (error) {
            res.status(400).send({ data: error });
        }
        return [2 /*return*/];
    });
}); });
router.get("/onepathhead", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (onePathRss) {
                // SENT FORM CACHED
                console.log(["/ONEPATHHEAD - SENT FROM CACHE"]);
                res.status(200).json({ data: onePathHead });
            }
            else {
                fetchOnePath();
                if (onePathHead)
                    res.status(200).json({ data: onePathHead });
            }
        }
        catch (error) {
            res.status(400).send({ data: error });
        }
        return [2 /*return*/];
    });
}); });
router.get("/thefirsts", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (theFirstsRss) {
                // SENT FORM CACHE
                console.log(["/THEFIRSTS - SENT FROM CACHE"]);
                res.status(200).json({ data: theFirstsRss });
            }
            else {
                // FILL CACHE
                fetchTheFirsts();
                if (theFirstsRss)
                    res.status(200).json({ data: theFirstsRss });
            }
        }
        catch (err) {
            res.status(400).send({ data: err });
        }
        return [2 /*return*/];
    });
}); });
router.get("/onepath", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (onePathRss) {
                // SENT FORM CACHE
                console.log(["/ONEPATH - SENT FROM CACHE"]);
                res.status(200).json({ data: onePathRss });
            }
            else {
                // FILL CACHE
                fetchOnePath();
                if (onePathRss)
                    res.status(200).json({ data: onePathRss });
            }
        }
        catch (err) {
            res.status(400).send({ data: err });
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
