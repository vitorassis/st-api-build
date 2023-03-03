"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conexao_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Conexao"));
const luxon_1 = require("luxon");
class ConexaoController {
    async create({ request }) {
        let r = request.body();
        let conexao = (await Conexao_1.default.query()
            .whereNull('cancelado_em')
            .where('cod_usuario', r.usuario.id)
            .where('status', false)
            .whereHas('conexao', q => {
            q.whereNull('cancelado_em')
                .where('cod_usuario', r.body.cod_usuario)
                .where('status', true);
        }))[0];
        if (conexao) {
            if (!conexao.status) {
                let dupla = (await Conexao_1.default.find('cod_conexao'));
                if (dupla) {
                    dupla.status = true;
                    conexao.status = true;
                    await dupla.save();
                    await conexao.save();
                    return { success: true, obj: 'Conexão aceita!' };
                }
                else {
                    return { success: false, obj: 'Erro!' };
                }
            }
        }
        else {
            conexao = new Conexao_1.default();
            conexao.cod_usuario = r.usuario.id;
            conexao.status = true;
            let dupla = new Conexao_1.default();
            dupla.cod_usuario = r.body.cod_usuario;
            await conexao.save();
            dupla.cod_conexao = conexao.id;
            await dupla.save();
            conexao.cod_conexao = dupla.id;
            await conexao.save();
            if (conexao.$isPersisted && dupla.$isPersisted) {
                return { success: true, obj: 'Conexão solicitada com sucesso!' };
            }
            else {
                return { success: false, obj: 'Erro!' };
            }
        }
    }
    async deny({ request }) {
        let r = request.body();
        let conexao = (await Conexao_1.default.query()
            .whereNull('cancelado_em')
            .where('id', r.body.cod_conexao)
            .where('cod_usuario', r.usuario.id))[0];
        if (conexao) {
            conexao.cancelado_em = luxon_1.DateTime.now();
            await conexao.save();
            let dupla = (await Conexao_1.default.find(conexao.cod_conexao));
            if (dupla) {
                dupla.cancelado_em = luxon_1.DateTime.now();
                await dupla.save();
                return { success: true, obj: 'Conexão cancelada' };
            }
            else {
                return { success: false, obj: 'Erro!' };
            }
        }
        else {
            return { success: false, obj: 'Erro!' };
        }
    }
}
exports.default = ConexaoController;
//# sourceMappingURL=ConexaoController.js.map