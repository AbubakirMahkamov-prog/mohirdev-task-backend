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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
class TaskController extends BaseController_1.default {
    constructor(model) {
        super(model);
        this.getMineNew = this.getMineNew.bind(this);
        this.getMineCompleted = this.getMineCompleted.bind(this);
        this.setCompleted = this.setCompleted.bind(this);
        this.setNew = this.setNew.bind(this);
        this.getStatistic = this.getStatistic.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const model = yield this.model.findOne({
                _id: id,
            });
            res.send(model);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.currentUser;
            const { title, content } = req.body;
            const model = yield this.model.create({
                title,
                content,
                owner_id: currentUser._id,
            });
            res.send(model);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, content } = req.body;
            const model = yield this.model.updateOne({ _id: id }, { title, content });
            res.send(model);
        });
    }
    getMineNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.currentUser;
            try {
                const modelList = yield this.model.find({
                    owner_id: currentUser._id,
                    status: 'new'
                });
                res.send(modelList);
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        });
    }
    getMineCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.currentUser;
            try {
                const modelList = yield this.model.find({
                    owner_id: currentUser._id,
                    status: 'completed'
                });
                res.send(modelList);
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        });
    }
    changeStatus(_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.model.updateOne({
                _id: _id,
            }, {
                status: status,
            });
            return model;
        });
    }
    setNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.currentUser;
            const { id } = req.params;
            const model = yield this.changeStatus(id, 'new');
            res.send(model);
        });
    }
    setCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.currentUser;
            const { id } = req.params;
            const model = yield this.changeStatus(id, 'completed');
            res.send(model);
        });
    }
    getStatistic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelList = yield this.model.aggregate([
                {
                    $lookup: {
                        from: 'users', // The name of the users collection
                        localField: 'owner_id',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: '$users' // Unwind the user array
                },
                {
                    $group: {
                        _id: '$owner_id',
                        fullname: { $first: '$users.fullname' }, // Extract the user's full name
                        newTasksCount: {
                            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
                        },
                        completedTasksCount: {
                            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                        },
                        totalTasksCount: {
                            $sum: 1 // Counts all tasks regardless of status
                        }
                    }
                },
                {
                    $addFields: {
                        completionPercentage: {
                            $cond: {
                                if: { $eq: ['$totalTasksCount', 0] }, // Avoid division by zero
                                then: 0,
                                else: {
                                    $multiply: [
                                        { $divide: ['$completedTasksCount', '$totalTasksCount'] },
                                        100
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);
            res.send(modelList);
        });
    }
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, status } = req.params;
            const modelList = yield this.model.find({
                owner_id: id,
                status: status
            });
            res.send(modelList);
        });
    }
}
exports.default = TaskController;
