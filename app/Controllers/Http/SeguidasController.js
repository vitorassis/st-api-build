"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seguida_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Seguida"));
const luxon_1 = require("luxon");
class SeguidasController {
    async seguir({ request }) {
        let r = request.body();
        let seguida = (await Seguida_1.default.query().where('cod_usuario', r.usuario.id).where('cod_perfil', r.body.cod_perfil).whereNull('cancelado_em'))[0];
        if (seguida) {
            seguida.cancelado_em = luxon_1.DateTime.now();
        }
        else {
            seguida = new Seguida_1.default();
            seguida.cod_usuario = r.usuario.id;
            seguida.cod_perfil = r.body.cod_perfil;
        }
        await seguida.save();
        return { success: seguida.$isPersisted };
    }
}
exports.default = SeguidasController;
//# sourceMappingURL=SeguidasController.js.map