"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'perfils';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('nome');
            table.string('localizacao').defaultTo(null);
            table.string('url_img_perfil').defaultTo(null);
            table.string('url_img_background').defaultTo(null);
            table.string('bio').defaultTo(null);
            table.date('dt_nascimento');
            table.dateTime('criado_em', { useTz: true });
            table.dateTime('cancelado_em', { useTz: true }).nullable().defaultTo(null);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1671287672775_perfils.js.map