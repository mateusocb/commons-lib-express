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
exports.BaseService = void 0;
class BaseService {
    constructor(entity, dataSource) {
        this.repository = dataSource.getRepository(entity);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repository.create(data);
            return yield this.repository.save(entity);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { id } });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    //   async update(id: number, data: Partial<T>): Promise<T | null> {
    //     const entity = await this.repository.findOneBy({
    //       where: { id },
    //     } as FindOneWhere<T>);
    //     if (!entity) {
    //       throw new Error("Entity not found");
    //     }
    //     Object.assign(entity, data);
    //     return await this.repository.save(entity);
    //   }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            if (result.affected === 0) {
                throw new Error("Entity not found");
            }
        });
    }
}
exports.BaseService = BaseService;
