"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'comentarios';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('cod_usuarioperfil').unsigned().references('id').inTable('usuario_perfils');
            table.text('comentario');
            table.integer('cod_idioma').unsigned().references('id').inTable('idiomas');
            table.integer('cod_carta').unsigned().references('id').inTable('cartas');
            table.timestamp('criado_em', { useTz: true });
            table.timestamp('cancelado_em', { useTz: true }).nullable().defaultTo(null);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1677431551429_comentarios.js.map