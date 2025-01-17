const mw = require("./mw");
const {    
    Auth,
    Languages,
    Namespaces,
    Translations,
    Users,
    Locales,
    ImportExport,
    APIKeys,
    App
} = require("./controllers");

const schemas = require("./schemas");

module.exports = function(app) {

    /* App */
    app.get("/api/app/statistics", [mw.isAuth], App.statistics)

    /* Auth */
    app.post("/api/auth/login", Auth.login);
    app.get("/api/auth/me", [mw.isAuth], Auth.me);
    app.post("/api/auth/selfEdit", [mw.isAuth], Auth.selfEdit);

    /* Users */
    app.post("/api/user/create", [mw.isAuth, mw.isValid(schemas.user_create)], Users.create);
    app.post("/api/user/update/:id", [mw.isAuth], Users.update);
    app.post("/api/user/find", [mw.isAuth], Users.find);

    /* Language */
    app.get("/api/language/find", [mw.isAuth], Languages.find);
    app.get("/api/language/findOne/:locale", [mw.isAuth], Languages.findOne);
    app.post("/api/language/create", [mw.isAuth, mw.isValid(schemas.lang_create)], Languages.create);
    app.post("/api/language/update/:locale", [mw.isAuth, mw.isValid(schemas.lang_update)], Languages.update);

    /* Namespace */
    app.get("/api/namespace/find", [mw.isAuth], Namespaces.find);
    app.get("/api/namespace/:slug", [mw.isAuth], Namespaces.findOne);
    app.post("/api/namespace/create", [mw.isAuth, mw.isValid(schemas.namespace_create)], Namespaces.create);
    app.post("/api/namespace/update/:slug", [mw.isAuth, mw.isValid(schemas.namespace_update)], Namespaces.update);

    // /* Translation */
    app.post("/api/translation/find", [mw.isAuth], Translations.find);
    app.post("/api/translation/create", [mw.isAuth, mw.isValid(schemas.string_create)], Translations.create);
    app.post("/api/translation/update/:id", [mw.isAuth, mw.isValid(schemas.string_update)], Translations.update);
    app.post("/api/translation/bulkUpdate", [mw.isAuth, mw.isValid(schemas.string_update)], Translations.bulkUpdate);
    app.post("/api/translation/bulkCreate", [mw.isAuth, mw.isValid(schemas.string_update)], Translations.bulkCreate);
    app.post("/api/translation/bulkRemove", [mw.isAuth, mw.isValid(schemas.string_update)], Translations.bulkRemove);

    app.get("/api/get/:key/:locale/:ns", [mw.isAPIKeyValid], Locales.get)

    /* Import */
    app.post("/api/import", [mw.isAuth, mw.isValid(schemas.import_translations)], ImportExport.import_translations);

    /* APIKeys */
    app.get("/api/apiKeys/find",[mw.isAuth], APIKeys.find)
}