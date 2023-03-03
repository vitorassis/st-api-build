"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Perfil"));
class ProfileController {
    async get({ request, params }) {
        let p = (await Perfil_1.default.query().where('id', params.id).whereNull('cancelado_em')
            .preload('usuario_perfil', q => {
            q.whereNull('cancelado_em')
                .preload('cartas', q => {
                q.whereNull('cancelado_em')
                    .whereNull('cod_perfildestino')
                    .whereHas('corpos', q => {
                    q.whereNull('cancelado_em')
                        .whereHas('idioma', q => {
                        q.whereHas('usuario_idioma', q => {
                            q.whereNull('cancelado_em')
                                .where('cod_usuario', request.body().usuario.id);
                        });
                    });
                })
                    .preload('corpos', q => {
                    q.whereNull('cancelado_em')
                        .whereHas('idioma', q => {
                        q.whereHas('usuario_idioma', q => {
                            q.whereNull('cancelado_em')
                                .where('cod_usuario', request.body().usuario.id);
                        });
                    });
                });
            });
        }));
        return p;
    }
    async procurar({ params }) {
        let p = (await Perfil_1.default.query().whereILike('nome', params.search + '%').whereNull('cancelado_em'));
        return p;
    }
}
exports.default = ProfileController;
//# sourceMappingURL=ProfileController.js.map