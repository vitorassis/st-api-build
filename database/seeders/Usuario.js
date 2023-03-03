"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Idioma_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Idioma"));
const Perfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Perfil"));
const Usuario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Usuario"));
const UsuarioIdioma_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioIdioma"));
const UsuarioPerfil_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UsuarioPerfil"));
class default_1 extends Seeder_1.default {
    async run() {
        let i = await Idioma_1.default.create({
            nome: 'Português (Brasil)',
            sigla: 'pt-br'
        });
        let u = await Usuario_1.default.create({
            email: 'user@u',
            senha: '1234',
            login: 'user'
        });
        let p = await Perfil_1.default.create({
            nome: 'Usuário'
        });
        await UsuarioPerfil_1.default.create({
            cod_perfil: p.id,
            cod_usuario: u.id,
            nivel_acesso: 1
        });
        await UsuarioIdioma_1.default.create({
            cod_idioma: i.id,
            cod_usuario: u.id,
            principal: true
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=Usuario.js.map