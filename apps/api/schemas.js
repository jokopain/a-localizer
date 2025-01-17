const Models = require("./models")

const user_create = Object.freeze({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        length: {
          min: 3,
          max: 36
        },
        test: /^[a-z0-9]+$/gi,
        custom: async (value) => {
            const user = await Models.User.findOne({where: {username: value}});
            return user ? "unique:Username already in use!" : false;
        }
    },
    password: {
        type: String,
        required: true,
    }
})


const lang_create = Object.freeze({
    name: {
        type: String,
        required: true,
        custom: async (value) => {
            try {
                const lang = await Models.Language.findOne({where: {name: value}});
                return lang ? "unique:Name already in use!" : false;
            } catch (error) {
                console.log(error);
                return " "
            }
        }
    },
    locale: {
        type: String,
        required: true,
        custom: async (value) => {
            try {
                const lang = await Models.Language.findOne({where: {locale: value}});
                return lang ? "unique:Locale already in use!" : false;
            } catch (error) {
                console.log(error);

                return " "
            }
        }
    }
})

const lang_update = Object.freeze({
    locale: {
        type: String,
        custom: async (value, id) => {
            try {
                const current = await Models.Language.findOne({where: {id: id}});
                const lang = await Models.Language.findOne({where: {locale: value}});
                if(current.locale === lang?.locale) return false;
                return lang ? "unique:Locale already in use!" : false;
            } catch (error) {
                console.log(error);

                return " "
            }
        }
    }
})

const namespace_create = {
    name: {
        type: String,
        required: true,
        custom: async (value) => {
            const namespace = await Models.Namespace.findOne({where: {name: value}});
            return namespace ? "unique:Name already in use!" : false;
        }
    },
    slug: {
        type: String,
        required: true,
        custom: async (value) => {
            const namespace = await Models.Namespace.findOne({where: {slug: value}});
            return namespace ? "unique:Slug already in use!" : false;
        }
    }
}

const namespace_update = {
    slug: {
        type: String,

        custom: async (value, id) => {
            const current = await Models.Namespace.findOne({where: {id: id}});
            const namespace = await Models.Namespace.findOne({where: {slug: value}});
            if(current.locale === namespace?.locale) return false;
            return namespace ? "unique:Slug already in use!" : false;
        }
    }
}

const string_create = {
    key: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    namespace: {
        type: String,
        required: true,
        custom: async (value) => {
            const namespace = await Models.Namespace.findOne({where: {slug: value}});
            return !namespace ? "notExist:Unknown Namespace!" : false;
        }
    },
    language: {
        type: String,
        required: true,
        custom: async (value) => {
            const lang = await Models.Language.findOne({where: {locale: value}});
            return !lang ? "notExist:Unknown Language!" : false;
        }
    }
}

const string_update = {
    key: {
        type: String,
        required: true
    },
    // text: {
    //     type: String,
    //     required: true
    // }
}

const import_translations = {
    slug: {
        type: String,
        required: true,
        custom: async (value) => {
            const namespace = await Models.Namespace.findOne({where: {slug: value}});
            return namespace ? "unique:Slug already in use!" : false;
        }
    },
    // locale: {
    //     type: String,
    //     required: true,
    //     custom: async (value) => {
    //         try {
    //             const lang = await Models.Language.findOne({where: {locale: value}});
    //             return !lang ? "notExist:Unknown Language!" : false;
    //         } catch (error) {
    //             console.log(error);

    //             return " "
    //         }
    //     }
    // }
}

module.exports = {
    user_create,
    lang_create,
    namespace_create,
    string_create,
    string_update,
    import_translations,
    lang_update,
    namespace_update
}