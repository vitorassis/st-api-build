"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'usuario_idiomas';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('cod_usuario').unsigned().references('usuarios.id');
            table.integer('cod_idioma').unsigned().references('idiomas.id');
            table.boolean('principal').defaultTo(false);
            table.dateTime('criado_em', { useTz: true });
            table.dateTime('cancelado_em', { useTz: true }).nullable().defaultTo(null);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1671287820655_usuario_idiomas.js.map