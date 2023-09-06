"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Test_1 = __importDefault(require("./Tests/Test"));
require('module-alias/register');
Test_1.default.DeleteTestDB();
Test_1.default.CreateTestDB();
require("@Tests/RegisterTest");
Test_1.default.DeleteTestDB();
//# sourceMappingURL=test.js.map