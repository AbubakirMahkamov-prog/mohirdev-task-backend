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
class BaseController {
    constructor(model) {
        this.model = model;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.update = this.update.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const model = yield this.model.create(data);
            res.send(model);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelList = yield this.model.find({
                isDeleted: false
            });
            res.send(modelList);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const model = yield this.model.findOne({
                _id: id,
                isDeleted: false
            });
            res.send(model);
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.model.updateOne({ _id: id }, {
                isDeleted: true
            });
            res.send({ id: id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const { id } = req.params;
            const model = yield this.model.updateOne({ _id: id }, data);
            res.send(model);
        });
    }
}
exports.default = BaseController;
