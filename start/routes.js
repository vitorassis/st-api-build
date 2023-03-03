"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const adonis_autoswagger_1 = __importDefault(require("adonis-autoswagger"));
const swagger_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/swagger"));
Route_1.default.get("/swagger", async () => {
    return adonis_autoswagger_1.default.docs(Route_1.default.toJSON(), swagger_1.default);
});
Route_1.default.get("/docs", async () => {
    return adonis_autoswagger_1.default.ui("/swagger");
});
Route_1.default.post('/login', "UsuarioController.login");
Route_1.default.post('/check-invite', "UsuarioController.checkInvite");
Route_1.default.post('/register', 'UsuarioController.register');
Route_1.default.post('/forgot-password', 'UsuarioController.forgotPassword');
Route_1.default.post('/reset-password', 'UsuarioController.resetPassword');
Route_1.default.get('/languages', 'IdiomaController.get');
Route_1.default.get('/check-login/:login', 'UsuarioController.checkUsuario');
Route_1.default.get('/check-email/:email', 'UsuarioController.checkEmail');
Route_1.default.group(() => {
    Route_1.default.post('/invite', "UsuarioController.invite");
    Route_1.default.group(() => {
        Route_1.default.post('/', "UsuarioController.edit");
        Route_1.default.delete('/', "UsuarioController.delete");
        Route_1.default.group(() => {
            Route_1.default.post('/', "UsuarioController.addLanguage");
            Route_1.default.delete('/', "UsuarioController.deleteLanguage");
            Route_1.default.post('/edit', "UsuarioController.editLanguage");
        }).prefix('/language');
        Route_1.default.post('/password', "UsuarioController.setPassword");
        Route_1.default.post('/follow-unfollow', 'SeguidasController.seguir');
    }).prefix('/user');
    Route_1.default.group(() => {
        Route_1.default.post('/', "CartaController.create");
        Route_1.default.delete('/', "CartaController.delete");
        Route_1.default.post('/view', "UsuarioController.viewCarta");
        Route_1.default.post('/like-dislike', 'CurtidasController.curtirDescurtir');
        Route_1.default.group(() => {
            Route_1.default.get('/:cod_carta', 'ComentariosController.getComentarios');
            Route_1.default.post('/', 'ComentariosController.comentar');
            Route_1.default.delete('/', 'ComentariosController.deletar');
        }).prefix('/comment');
        Route_1.default.post('/share', 'CartaController.compartilhar');
    }).prefix('/letter');
    Route_1.default.group(() => {
        Route_1.default.get('/:id', 'ProfileController.get');
        Route_1.default.get('/search/:search', 'ProfileController.procurar');
    }).prefix('/profile');
    Route_1.default.get('/feed', 'FeedController.get');
}).middleware('auth:api');
//# sourceMappingURL=routes.js.map