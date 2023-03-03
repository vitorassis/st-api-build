"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carta_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Carta"));
const CartaCorpo_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CartaCorpo"));
const CartaSelo_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CartaSelo"));
const UsuarioPerfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioPerfil"));
const luxon_1 = require("luxon");
class CartaController {
    async create({ request }) {
        let r = request.body();
        let carta = new Carta_1.default();
        carta.cod_usuarioperfil = r.body.cod_usuarioperfil;
        carta.cod_perfildestino = r.body.cod_perfildestino;
        await carta.save();
        if (!carta.$isPersisted)
            return { success: false };
        for (let i = 0; i < r.body.corpos.length; i++) {
            await CartaCorpo_1.default.create({
                cod_idioma: r.body.corpos[i].cod_idioma,
                titulo: r.body.corpos[i].titulo,
                corpo: r.body.corpos[i].corpo,
                cod_carta: carta.id
            });
        }
        for (let i = 0; i < r.body.selos.length; i++) {
            await CartaSelo_1.default.create({
                cod_carta: carta.id,
                cod_selo: r.body.selo[i]
            });
        }
        return {
            success: true
        };
    }
    async delete({ request }) {
        let r = request.body();
        let cod_usuario = r.usuario.id;
        let carta = await Carta_1.default.query().where('id', r.body.cod_carta).whereNull('cancelado_em').first();
        if (carta) {
            let perfil = await UsuarioPerfil_1.default.query()
                .where('id', carta.cod_usuarioperfil).first();
            let acesso;
            if (perfil)
                acesso = await UsuarioPerfil_1.default.query()
                    .where('cod_perfil', perfil.cod_perfil)
                    .where('cod_usuario', cod_usuario).whereNull("cancelado_em").whereNot('nivel_acesso', 2).first();
            if (acesso) {
                carta.cancelado_em = luxon_1.DateTime.now();
                await carta.save();
                if (carta.$isPersisted) {
                    return { success: true };
                }
            }
            else
                return { success: false };
        }
        else
            return { success: false };
    }
    async compartilhar({ request }) {
        let r = request.body();
        let carta = (await Carta_1.default.query().whereNull('cancelado_em').where('id', r.body.cod_carta))[0];
        if (carta) {
            while (carta && carta.cod_compartilhamento != null) {
                carta = (await Carta_1.default.query().whereNull('cancelado_em').where('id', carta.cod_compartilhamento))[0];
            }
            if (carta) {
                let nova = new Carta_1.default();
                nova.cod_usuarioperfil = r.body.cod_usuarioperfil;
                nova.cod_perfildestino = r.body.cod_perfildestino;
                nova.cod_compartilhamento = r.body.r.body.cod_carta;
                nova.cod_comp_original = carta.id;
                await nova.save();
                return { success: nova.$isPersisted };
            }
        }
        return { success: false };
    }
}
exports.default = CartaController;
//# sourceMappingURL=CartaController.js.map