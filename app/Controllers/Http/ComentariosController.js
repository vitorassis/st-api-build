"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comentario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Comentario"));
const UsuarioPerfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioPerfil"));
const luxon_1 = require("luxon");
class ComentariosController {
    async comentar({ request }) {
        let r = request.body();
        let c = new Comentario_1.default();
        let u = (await UsuarioPerfil_1.default.query()
            .where('id', r.body.cod_usuarioperfil).where('cod_usuario', r.usuario.id).whereNull('cancelado_em'))[0];
        if (u) {
            c.cod_usuarioperfil = r.body.cod_usuarioperfil;
            c.cod_carta = r.body.cod_aula;
            c.cod_idioma = r.body.cod_idioma;
            c.comentario = r.body.comentario;
            await c.save();
            return {
                success: c.$isPersisted, obj: await this.fetchComentarios(r.body.cod_carta, r.usuario.id)
            };
        }
        return {
            success: false, obj: await this.fetchComentarios(r.body.cod_carta, r.usuario.id)
        };
    }
    async fetchComentarios(carta, usuario) {
        return (await Comentario_1.default.query()
            .whereNull('cancelado_em')
            .whereHas('idioma', q => { q.whereHas('usuario_idioma', q => { q.whereNull('cancelado_em').where('cod_usuario', usuario); }); })
            .whereHas('carta', q => { q.whereNull('cancelado_em').where('id', carta); }));
    }
    async getComentarios({ request, params }) {
        return await this.fetchComentarios(params.cod_carta, request.body().usuario.id);
    }
    async deletar({ request }) {
        let r = request.body();
        let c = (await Comentario_1.default.query().whereNull('cancelado_em').where('id', r.body.cod_comentario).whereHas('usuario_perfil', q => {
            q.whereNull('cancelado_em').where('cod_usuario', r.usuario.id);
        }))[0];
        if (c) {
            c.cancelado_em = luxon_1.DateTime.now();
            await c.save();
            return { success: c.$isPersisted, obj: await this.fetchComentarios(c.cod_carta, r.usuario.id) };
        }
        else {
            let c = (await Comentario_1.default.query().whereNull('cancelado_em').where('id', r.body.cod_comentario).whereHas('carta', q => {
                q.whereNull('cancelado_em').whereHas('usuario_perfil', q => {
                    q.whereNull('cancelado_em').where('cod_usuario', r.usuario.id);
                });
            }))[0];
            if (c) {
                c.cancelado_em = luxon_1.DateTime.now();
                await c.save();
                return { success: c.$isPersisted, obj: await this.fetchComentarios(c.cod_carta, r.usuario.id) };
            }
            else {
                let c = (await Comentario_1.default.find(r.body.cod_comentario));
                if (c)
                    return { success: false, obj: await this.fetchComentarios(c.cod_carta, r.usuario.id) };
                else
                    return {};
            }
        }
    }
}
exports.default = ComentariosController;
//# sourceMappingURL=ComentariosController.js.map