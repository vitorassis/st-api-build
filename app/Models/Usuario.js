"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Convite_1 = __importDefault(require("./Convite"));
const Inativacao_1 = __importDefault(require("./Inativacao"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const UsuarioPerfil_1 = __importDefault(require("./UsuarioPerfil"));
const UsuarioIdioma_1 = __importDefault(require("./UsuarioIdioma"));
const Conexao_1 = __importDefault(require("./Conexao"));
const UsuarioVisualizacao_1 = __importDefault(require("./UsuarioVisualizacao"));
const Seguida_1 = __importDefault(require("./Seguida"));
const Curtida_1 = __importDefault(require("./Curtida"));
class Usuario extends Orm_1.BaseModel {
    static async hashPassword(user) {
        if (user.$dirty.senha) {
            user.senha = await Hash_1.default.make(user.senha);
        }
    }
    async checkSenha(check) {
        let out = await Hash_1.default.verify(this.senha, check);
        return out;
    }
    static getperfil_pessoal(query) {
        query.preload('perfil_pessoal', q => q.where('nivel_acesso', 1).whereNull('cancelado_em').preload('perfil'));
    }
    static getoutros_perfis(query) {
        query.preload('outros_perfis', q => q.whereNull('cancelado_em').whereNot('nivel_acesso', 1).preload('perfil'));
    }
    static getIdiomas(query) {
        query.preload('usuario_idioma', q => { q.whereNull('cancelado_em').preload('idioma', q => { q.whereNull('cancelado_em'); }); });
    }
    static getVisualizacoes(query) {
        query.preload('views', q => { q.orderBy('cod_carta'); });
    }
    get visualizacoes() {
        let v = [];
        this.views.forEach(e => {
            let p = v.findIndex(o => o.cod_carta == e.cod_carta);
            if (p > -1)
                v[p].qtd++;
            else
                v.push({ cod_carta: e.cod_carta, qtd: 1 });
        });
        v.sort((a, b) => a.qtd - b.qtd);
        return v;
    }
    get qtd_seguindo() {
        if (this.seguindo)
            return this.seguindo.length;
        return 0;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Usuario.prototype, "login", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Usuario.prototype, "cod_convite", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Usuario.prototype, "cod_inativacao", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Usuario.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Usuario.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Convite_1.default, { foreignKey: 'cod_convite' }),
    __metadata("design:type", Object)
], Usuario.prototype, "convite", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Inativacao_1.default, { foreignKey: 'cod_inativacao' }),
    __metadata("design:type", Object)
], Usuario.prototype, "inativacao", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioPerfil_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "outros_perfis", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Conexao_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "conexoes", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioIdioma_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "usuario_idioma", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => UsuarioPerfil_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "perfil_pessoal", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioVisualizacao_1.default, { foreignKey: 'cod_usuario', serializeAs: null }),
    __metadata("design:type", Object)
], Usuario.prototype, "views", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Seguida_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "seguindo", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Curtida_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "curtidas", void 0);
__decorate([
    (0, Orm_1.computed)({ serializeAs: null }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Usuario.prototype, "visualizacoes", null);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Usuario.prototype, "qtd_seguindo", null);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Usuario]),
    __metadata("design:returntype", Promise)
], Usuario, "hashPassword", null);
__decorate([
    (0, Orm_1.beforeFetch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Usuario, "getperfil_pessoal", null);
__decorate([
    (0, Orm_1.beforeFetch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Usuario, "getoutros_perfis", null);
__decorate([
    (0, Orm_1.beforeFetch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Usuario, "getIdiomas", null);
__decorate([
    (0, Orm_1.beforeFetch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Usuario, "getVisualizacoes", null);
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map