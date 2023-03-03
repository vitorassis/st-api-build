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
const UsuarioPerfil_1 = __importDefault(require("./UsuarioPerfil"));
const Carta_1 = __importDefault(require("./Carta"));
const Seguida_1 = __importDefault(require("./Seguida"));
class Perfil extends Orm_1.BaseModel {
    get qtd_seguidores() {
        if (this.seguidores)
            return this.seguidores.length;
        return 0;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Perfil.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Perfil.prototype, "nome", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Perfil.prototype, "localizacao", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Perfil.prototype, "url_img_perfil", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Perfil.prototype, "url_img_background", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Perfil.prototype, "bio", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", luxon_1.DateTime)
], Perfil.prototype, "dt_nascimento", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Perfil.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Perfil.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioPerfil_1.default, { foreignKey: 'cod_perfil' }),
    __metadata("design:type", Object)
], Perfil.prototype, "usuario_perfil", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Carta_1.default, { foreignKey: 'cod_perfildestino' }),
    __metadata("design:type", Object)
], Perfil.prototype, "cartas_direcionadas", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Seguida_1.default, { foreignKey: 'cod_perfil' }),
    __metadata("design:type", Object)
], Perfil.prototype, "seguidores", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Perfil.prototype, "qtd_seguidores", null);
exports.default = Perfil;
//# sourceMappingURL=Perfil.js.map