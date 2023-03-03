"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'usuario_perfils';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('cod_usuario').unsigned().references('usuarios.id');
            table.integer('cod_perfil').unsigned().references('perfils.id');
            table.integer('nivel_acesso').checkBetween([1, 2, 3, 4]);
            table.dateTime('criado_em', { useTz: true });
            table.integer('criado_por').unsigned().references('usuario_perfils.id').defaultTo(null);
            table.dateTime('cancelado_em', { useTz: true }).nullable().defaultTo(null);
            table.integer('cancelado_por').unsigned().references('usuario_perfils.id').defaultTo(null);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1671287808070_usuario_perfils.js.map