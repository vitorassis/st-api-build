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
const Perfil_1 = __importDefault(require("./Perfil"));
const CartaCorpo_1 = __importDefault(require("./CartaCorpo"));
const Selo_1 = __importDefault(require("./Selo"));
const UsuarioVisualizacao_1 = __importDefault(require("./UsuarioVisualizacao"));
const Curtida_1 = __importDefault(require("./Curtida"));
const Comentario_1 = __importDefault(require("./Comentario"));
class Carta extends Orm_1.BaseModel {
    get qtd_curtidas() {
        if (this.curtidas)
            return this.curtidas.length;
        return 0;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Carta.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Carta.prototype, "cover_img", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Carta.prototype, "cod_usuarioperfil", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Carta.prototype, "cod_perfildestino", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Carta.prototype, "cod_compartilhamento", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Carta.prototype, "cod_comp_original", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Carta.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Carta.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => UsuarioPerfil_1.default, { foreignKey: 'cod_usuarioperfil' }),
    __metadata("design:type", Object)
], Carta.prototype, "usuario_perfil", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Perfil_1.default, { foreignKey: 'cod_perfildestino' }),
    __metadata("design:type", Object)
], Carta.prototype, "perfil_destino", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Carta, { foreignKey: 'cod_comp_original' }),
    __metadata("design:type", Object)
], Carta.prototype, "compartilhado", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Carta, { foreignKey: 'cod_compartilhamento' }),
    __metadata("design:type", Object)
], Carta.prototype, "compartilhamento", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => CartaCorpo_1.default, { foreignKey: 'cod_carta' }),
    __metadata("design:type", Object)
], Carta.prototype, "corpos", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Selo_1.default, { foreignKey: 'cod_carta' }),
    __metadata("design:type", Object)
], Carta.prototype, "selos", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsuarioVisualizacao_1.default, { foreignKey: 'cod_carta' }),
    __metadata("design:type", Object)
], Carta.prototype, "visualizacoes", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Curtida_1.default, { foreignKey: 'cod_carta', serializeAs: null }),
    __metadata("design:type", Object)
], Carta.prototype, "curtidas", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Comentario_1.default, { foreignKey: 'cod_carta' }),
    __metadata("design:type", Object)
], Carta.prototype, "comentarios", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Carta.prototype, "qtd_curtidas", null);
exports.default = Carta;
//# sourceMappingURL=Carta.js.map