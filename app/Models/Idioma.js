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
const CartaCorpo_1 = __importDefault(require("./CartaCorpo"));
const UsuarioIdioma_1 = __importDefault(require("./UsuarioIdioma"));
const Comentario_1 = __importDefault(require("./Comentario"));
class Idioma extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Idioma.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Idioma.prototype, "sigla", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Idioma.prototype, "nome", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Idioma.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Idioma.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => CartaCorpo_1.default, { foreignKey: 'cod_idioma' }),
    __metadata("design:type", Object)
], Idioma.prototype, "carta_corpos", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioIdioma_1.default, { foreignKey: 'cod_idioma' }),
    __metadata("design:type", Object)
], Idioma.prototype, "usuario_idioma", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Comentario_1.default, { foreignKey: 'cod_idioma' }),
    __metadata("design:type", Object)
], Idioma.prototype, "comentarios", void 0);
exports.default = Idioma;
//# sourceMappingURL=Idioma.js.map