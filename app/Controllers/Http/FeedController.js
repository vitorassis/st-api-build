"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carta_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Carta"));
const Curtida_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Curtida"));
const Usuario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Usuario"));
class FeedsController {
    async get({ request }) {
        let r = request.body();
        let usuario = (await Usuario_1.default.query()
            .where('id', r.usuario.id))[0];
        if (usuario) {
            let posts = (await Carta_1.default.query()
                .whereHas('usuario_perfil', q => {
                q.whereNull('cancelado_em')
                    .whereHas('perfil', q => {
                    q.whereNull('cancelado_em');
                }).whereHas('usuario', q => {
                    q.whereNull('cancelado_em');
                });
            })
                .whereNull('cancelado_em')
                .whereHas('perfil_destino', q => {
                q.whereNull('cancelado_em').where('id', usuario.perfil_pessoal.perfil.id);
            }).preload('curtidas', q => { q.whereNull('cancelado_em'); })
                .preload('corpos', q => {
                q.whereNull('cancelado_em')
                    .whereHas('idioma', q => {
                    q.whereHas('usuario_idioma', q => {
                        q.whereNull('cancelado_em')
                            .where('cod_usuario', usuario.id);
                    });
                });
            }).preload('compartilhado', q => {
                q.whereNull('cancelado_em').preload('corpos', q => {
                    q.whereNull('cancelado_em')
                        .whereHas('idioma', q => {
                        q.whereHas('usuario_idioma', q => {
                            q.whereNull('cancelado_em')
                                .where('cod_usuario', usuario.id);
                        });
                    });
                });
            }).preload('usuario_perfil', q => {
                q.whereNull('cancelado_em')
                    .preload('perfil', q => {
                    q.whereNull('cancelado_em');
                });
            }).orderBy('criado_em', 'desc')).concat(await Carta_1.default.query()
                .whereHas('usuario_perfil', q => {
                q.whereNull('cancelado_em')
                    .whereHas('perfil', q => {
                    q.whereNull('cancelado_em');
                }).whereHas('usuario', q => {
                    q.whereNull('cancelado_em');
                });
            }).
                whereHas('corpos', q => {
                q.whereNull('cancelado_em')
                    .whereHas('idioma', q => {
                    q.whereHas('usuario_idioma', q => {
                        q.whereNull('cancelado_em')
                            .where('cod_usuario', usuario.id);
                    });
                });
            }).orWhereHas('usuario_perfil', q => {
                q.whereNull('cancelado_em')
                    .whereHas('usuario', q => {
                    q.whereNull('cancelado_em')
                        .whereHas('seguindo', q => {
                        q.whereNull('cancelado_em')
                            .where('cod_usuario', usuario.id);
                    });
                });
            }).preload('curtidas', q => { q.whereNull('cancelado_em'); })
                .preload('corpos', q => {
                q.whereNull('cancelado_em')
                    .whereHas('idioma', q => {
                    q.whereHas('usuario_idioma', q => {
                        q.whereNull('cancelado_em')
                            .where('cod_usuario', usuario.id);
                    });
                });
            }).preload('compartilhado', q => {
                q.whereNull('cancelado_em').preload('corpos', q => {
                    q.whereNull('cancelado_em')
                        .whereHas('idioma', q => {
                        q.whereHas('usuario_idioma', q => {
                            q.whereNull('cancelado_em')
                                .where('cod_usuario', usuario.id);
                        });
                    });
                });
            }).preload('usuario_perfil', q => {
                q.whereNull('cancelado_em')
                    .preload('perfil', q => {
                    q.whereNull('cancelado_em');
                });
            }).whereNull('cancelado_em').
                whereNull('cod_perfildestino').orderBy('criado_em', 'desc'));
            return await this.createFeed(posts, usuario.visualizacoes, usuario.id);
        }
    }
    async createFeed(posts, visualizacoes, usuario) {
        let feed = [];
        let MAX = 500;
        let bruto = [];
        for (let i = 0; i < posts.length; i++) {
            let e = posts[i];
            let p = visualizacoes.findIndex(o => o.cod_carta == e.id);
            if (p == -1 && bruto.length < MAX) {
                let curtido = (await Curtida_1.default.query().whereNull('cancelado_em').where('cod_carta', e.id).where('cod_usuario', usuario))[0];
                bruto.push({ carta: e, primeira_vez: true, curtido: curtido != null });
            }
        }
        for (let i = 0; i < visualizacoes.length; i++) {
            let e = visualizacoes[i];
            let post = posts.find(o => o.id == e.cod_carta);
            if (post && bruto.length < MAX) {
                let curtido = (await Curtida_1.default.query().whereNull('cancelado_em').where('cod_carta', e.cod_carta).where('cod_usuario', usuario))[0];
                bruto.push({ carta: post, primeira_vez: false, curtido: curtido != null });
            }
        }
        bruto.sort((a, b) => b.carta.id - a.carta.id);
        let controle = '';
        let dia = {};
        bruto.forEach(b => {
            if (b.carta.criado_em.toFormat('yyyyMMdd') != controle) {
                if (dia.data) {
                    feed.push(dia);
                }
                dia = {
                    data: b.carta.criado_em.toFormat('dd/MM/yyyy'),
                    posts: []
                };
                controle = b.carta.criado_em.toFormat('yyyyMMdd');
            }
            dia.posts.push(b);
        });
        feed.push(dia);
        return feed;
    }
}
exports.default = FeedsController;
//# sourceMappingURL=FeedController.js.map