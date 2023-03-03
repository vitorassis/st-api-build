"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Idioma_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Idioma"));
class IdiomaController {
    async get() {
        let i = (await Idioma_1.default.query().whereNull('cancelado_em'));
        return { success: true, obj: i };
    }
}
exports.default = IdiomaController;
//# sourceMappingURL=IdiomaController.js.map