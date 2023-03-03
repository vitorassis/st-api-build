"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Convite_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Convite"));
const Inativacao_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Inativacao"));
const Perfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Perfil"));
const SenhaToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/SenhaToken"));
const Usuario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Usuario"));
const UsuarioIdioma_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioIdioma"));
const UsuarioPerfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioPerfil"));
const UsuarioVisualizacao_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioVisualizacao"));
const luxon_1 = require("luxon");
class UsuarioController {
    async login({ auth, request }) {
        const login = request.input('login');
        const password = request.input('senha');
        const user = (await Usuario_1.default
            .query()
            .whereRaw("(email = '" + login + "' or login = '" + login + "')")
            .whereNull('cancelado_em')
            .whereNull('cod_inativacao'))[0];
        if (!user)
            return { success: false, obj: 'Usuário não encontrado' };
        if (!await user.checkSenha(password)) {
            return { success: false, obj: 'Usuário não encontrado' };
        }
        let err = false;
        if (err) {
            return { success: false, obj: 'Usuário não encontrado' };
        }
        const token = await auth.use('api').generate(user, {
            expiresIn: '1 day'
        });
        return {
            success: true,
            obj: {
                usuario: {
                    ...(user.serialize()),
                    token: token.token
                }
            }
        };
    }
    async invite({ request }) {
        let u = request.body().usuario;
        if (u) {
            let convite = new Convite_1.default();
            convite.cod_usuario = u.id;
            await convite.save();
            if (convite) {
                return { success: true, obj: convite };
            }
            else {
                return { success: false };
            }
        }
        else {
            return { success: false };
        }
    }
    async checkInvite({ request }) {
        let i = request.input('invite');
        if (i) {
            let convite = (await Convite_1.default.query().whereNull('usado_em').whereRaw("'" + luxon_1.DateTime.now() + "' < valido_ate").where('token', i))[0];
            if (convite) {
                convite.usado_em = luxon_1.DateTime.now();
                await convite.save();
                await convite.load('usuario');
                if (convite.$isPersisted) {
                    return { success: true, obj: convite };
                }
                else {
                    return { success: false };
                }
            }
            else {
                return { success: false };
            }
        }
    }
    async register({ request }) {
        let nome = request.input('nome');
        let login = request.input('login');
        let email = request.input('email');
        let senha = request.input('senha');
        let cod_convite = request.input('cod_convite');
        let dt_nascimento = request.input('dt_nascimento');
        if (nome && email && senha && login && cod_convite) {
            let usuario = new Usuario_1.default();
            usuario.email = email;
            usuario.login = login;
            usuario.senha = senha;
            usuario.cod_convite = cod_convite;
            await usuario.save();
            if (usuario.$isPersisted) {
                let perfil = new Perfil_1.default();
                perfil.nome = nome;
                perfil.dt_nascimento = dt_nascimento;
                await perfil.save();
                if (perfil.$isPersisted) {
                    await UsuarioPerfil_1.default.create({
                        cod_perfil: perfil.id,
                        cod_usuario: usuario.id,
                        nivel_acesso: 1
                    });
                    await UsuarioIdioma_1.default.create({
                        cod_idioma: 1,
                        cod_usuario: usuario.id,
                        principal: true
                    });
                    await usuario.load('usuario_idioma', q => q.whereNull('cancelado_em'));
                    for (let i = 0; i < usuario.usuario_idioma.length; i++)
                        await usuario.usuario_idioma[i].load('idioma');
                    return { success: true, obj: usuario };
                }
                else {
                    return { success: false };
                }
            }
            else {
                return { success: false };
            }
        }
        else {
            return { success: false };
        }
    }
    async edit({ request }) {
        let r = request.body();
        let usuario = (await Usuario_1.default.query().where('id', request.body().usuario.id))[0];
        usuario.email = r.body.email;
        await usuario.save();
        usuario.perfil_pessoal.perfil.nome = r.body.nome;
        usuario.perfil_pessoal.perfil.bio = r.body.bio;
        usuario.perfil_pessoal.perfil.localizacao = r.body.localizacao;
        usuario.perfil_pessoal.perfil.dt_nascimento = r.body.dt_nascimento;
        await usuario.perfil_pessoal.perfil.save();
        if (usuario.perfil_pessoal.perfil.$isPersisted)
            return { success: true, obj: usuario };
        else
            return { success: false };
    }
    async delete({ request }) {
        if (request.body().usuario.cod_inativacao == null) {
            let u = (await Usuario_1.default.query().where('id', request.body().usuario.id))[0];
            let inativ = new Inativacao_1.default();
            inativ.cod_usuario = u.id;
            await inativ.save();
            if (inativ.$isPersisted) {
                u.cod_inativacao = inativ.id;
                await u.save();
                if (u.$isPersisted) {
                    return { success: true };
                }
                else {
                    return { success: false };
                }
            }
            else
                return { succes: false };
        }
    }
    async forgotPassword({ request }) {
        let email = request.input('email');
        let usuario = (await Usuario_1.default.query().where('email', email).whereNull('cod_inativacao'))[0];
        if (usuario) {
            let token = new SenhaToken_1.default();
            token.cod_usuario = usuario.id;
            await token.save();
            await Mail_1.default.sendLater((message) => {
                message
                    .from('no-reply@socialtree.link')
                    .to(email)
                    .subject('SocialTree - Esqueci minha senha')
                    .htmlView('emails/forgot-password', { usuario, token });
            });
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
    async resetPassword({ request }) {
        let token = (await SenhaToken_1.default.query().whereNull('usado_em').where('token', request.input('token')))[0];
        if (token) {
            let usuario = (await Usuario_1.default.query().where('id', token.cod_usuario))[0];
            usuario.senha = request.input('senha');
            await usuario.save();
            token.usado_em = luxon_1.DateTime.now();
            await token.save();
            if (usuario.$isPersisted) {
                return { success: true };
            }
            else
                return { success: false };
        }
        else
            return { success: false };
    }
    async addLanguage({ request }) {
        let r = request.body();
        let u = (await Usuario_1.default.query()
            .where('id', r.usuario.id)
            .whereNull('cod_inativacao').preload('usuario_idioma', q => q.where('cod_idioma', r.body.cod_idioma).whereNull('cancelado_em')))[0];
        if (u.usuario_idioma.length == 0) {
            if (r.body.principal) {
                let princ = (await UsuarioIdioma_1.default.query()
                    .where('cod_usuario', r.usuario)
                    .where('principal', true)
                    .whereNull('cancelado_em'))[0];
                princ.principal = false;
                await princ.save();
            }
            await UsuarioIdioma_1.default.create({
                cod_idioma: r.body.cod_idioma,
                principal: r.body.principal,
                cod_usuario: r.usuario.id
            });
            let idiomas = (await UsuarioIdioma_1.default.query()
                .where('cod_usuario', r.usuario.id)
                .whereNull('cancelado_em')
                .preload('idioma'));
            return { success: true, obj: idiomas };
        }
        else {
            return { success: false };
        }
    }
    async editLanguage({ request }) {
        let r = request.body();
        let u = (await Usuario_1.default.query()
            .where('id', r.usuario.id)
            .whereNull('cod_inativacao').preload('usuario_idioma', q => q.where('cod_idioma', r.body.cod_idioma).whereNull('cancelado_em')))[0];
        if (u.usuario_idioma.length > 0) {
            if (r.body.principal != u.usuario_idioma[0].principal) {
                if (r.body.principal) {
                    let princ = (await UsuarioIdioma_1.default.query()
                        .where('cod_usuario', r.usuario)
                        .where('principal', true)
                        .whereNull('cancelado_em'))[0];
                    princ.principal = false;
                    await princ.save();
                }
            }
            u.usuario_idioma[0].principal = r.body.principal;
            await u.usuario_idioma[0].save();
            let idiomas = (await UsuarioIdioma_1.default.query()
                .where('cod_usuario', r.usuario.id)
                .whereNull('cancelado_em')
                .preload('idioma'));
            return { success: true, obj: idiomas };
        }
        else {
            return { success: false };
        }
    }
    async deleteLanguage({ request }) {
        let r = request.body();
        let u = (await Usuario_1.default.query()
            .where('id', r.usuario.id)
            .whereNull('cod_inativacao').preload('usuario_idioma', q => q.where('cod_idioma', r.body.cod_idioma).whereNull('cancelado_em')))[0];
        if (u.usuario_idioma.length > 0) {
            u.usuario_idioma[0].cancelado_em = luxon_1.DateTime.now();
            await u.usuario_idioma[0].save();
            let idiomas = (await UsuarioIdioma_1.default.query()
                .where('cod_usuario', r.usuario.id)
                .whereNull('cancelado_em')
                .preload('idioma'));
            return { success: true, obj: idiomas };
        }
        else {
            return { success: false };
        }
    }
    async setPassword({ request }) {
        let u = (await Usuario_1.default.query()
            .where('id', request.body().usuario.id)
            .whereNull('cod_inativacao'))[0];
        if (u) {
            u.senha = request.body().body.senha;
            await u.save();
            return { success: u.$isPersisted };
        }
        else {
            return { success: false };
        }
    }
    async checkLogin({ params }) {
        let usuario = (await Usuario_1.default.query().where('login', params.login))[0];
        return { exists: usuario != null };
    }
    async checkEmail({ params }) {
        let usuario = (await Usuario_1.default.query().where('email', params.email))[0];
        return { exists: usuario != null };
    }
    async viewCarta({ request }) {
        let r = request.body();
        let visualizacao = new UsuarioVisualizacao_1.default();
        visualizacao.cod_usuario = r.usuario.id;
        visualizacao.cod_carta = r.body.cod_carta;
        await visualizacao.save();
        return { success: visualizacao.$isPersisted };
    }
}
exports.default = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map