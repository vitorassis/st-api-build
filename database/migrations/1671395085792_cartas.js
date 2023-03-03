"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'cartas';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('cover_img');
            table.integer('cod_usuarioperfil').unsigned().references('usuario_perfils.id');
            table.integer('cod_perfildestino').unsigned().defaultTo(null).references('perfils.id');
            table.integer('cod_compartilhamento').unsigned().defaultTo(null).references('cartas.id');
            table.integer('cod_comp_original').unsigned().defaultTo(null).references('cartas.id');
            table.timestamp('criado_em', { useTz: true });
            table.timestamp('cancelado_em', { useTz: true }).nullable().defaultTo(null);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1671395085792_cartas.js.map