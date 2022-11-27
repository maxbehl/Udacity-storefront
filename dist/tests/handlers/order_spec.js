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
var server_1 = __importDefault(require("../../server"));
var supertest_1 = __importDefault(require("supertest"));
var order_1 = require("../../models/order");
var user_1 = require("../../models/user");
var product_1 = require("../../models/product");
var request = supertest_1.default(server_1.default);
describe('Order endpoint: ', function () {
    var userData = new user_1.UserDB();
    var orderData = new order_1.OrderDB();
    var productData = new product_1.ProductDB();
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var testuser1, testuser2, order, product1, product2, productInOrder1, productInOrder2, userRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testuser1 = {
                        id: '1',
                        firstname: 'Max',
                        lastname: 'Mustermann',
                        password: 'password123'
                    };
                    testuser2 = {
                        id: '1',
                        firstname: 'Michael',
                        lastname: 'Mustermann',
                        password: 'password456'
                    };
                    return [4 /*yield*/, userData.create(testuser1)];
                case 1:
                    _a.sent();
                    order = {
                        user_id: '1',
                        status: 'active'
                    };
                    return [4 /*yield*/, orderData.create(order)];
                case 2:
                    _a.sent();
                    product1 = {
                        name: 'shirt',
                        price: 10
                    };
                    product2 = {
                        name: 'trouser',
                        price: 50
                    };
                    return [4 /*yield*/, productData.create(product1)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, productData.create(product2)];
                case 4:
                    _a.sent();
                    productInOrder1 = {
                        quantity: 2,
                        orderId: '1',
                        productId: '2'
                    };
                    productInOrder2 = {
                        quantity: 1,
                        orderId: '1',
                        productId: '1'
                    };
                    return [4 /*yield*/, orderData.addProduct(productInOrder1)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, orderData.addProduct(productInOrder1)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/users')
                            .send(testuser1)
                            .set('Accept', 'application/json')];
                case 7:
                    userRequest = _a.sent();
                    token = userRequest.body;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Testing GET order by user /orders/user/:user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/orders/user/1')
                        .set("Authorization", "Bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userData.clearTableUsers()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, productData.clearTableProducts()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, orderData.clearTableOrders()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
