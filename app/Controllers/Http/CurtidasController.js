"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curtida_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Curtida"));
const luxon_1 = require("luxon");
class CurtidasController {
    async curtirDescurtir({ request }) {
        let r = request.body();
        let curtida = (await Curtida_1.default.query().where('cod_usuario', r.usuario.id).where('cod_carta', r.body.cod_carta).whereNull('cancelado_em'))[0];
        if (curtida) {
            curtida.cancelado_em = luxon_1.DateTime.now();
        }
        else {
            curtida = new Curtida_1.default();
            curtida.cod_usuario = r.usuario.id;
            curtida.cod_carta = r.body.cod_carta;
        }
        await curtida.save();
        return { success: curtida.$isPersisted };
    }
}
exports.default = CurtidasController;
//# sourceMappingURL=CurtidasController.js.map