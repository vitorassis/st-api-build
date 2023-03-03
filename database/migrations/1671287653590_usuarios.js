"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'usuarios';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('email').unique();
            table.string('login').unique();
            table.string('senha');
            table.integer('cod_convite').defaultTo(null).unique();
            table.dateTime('criado_em', { useTz: true });
            table.dateTime('cancelado_em', { useTz: true }).nullable().defaultTo(null);
            table.integer('cod_inativacao').defaultTo(null).unique();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1671287653590_usuarios.js.map