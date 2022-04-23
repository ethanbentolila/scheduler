"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/', controllers_1.DisplayHomePage);
router.get('/home', controllers_1.DisplayHomePage);
router.post('/', controllers_1.ProcessHomePage);
router.post('/home', controllers_1.ProcessHomePage);
exports.default = router;
//# sourceMappingURL=index.js.map