const Models = require("../models")

exports.import_translations = async (req, res) => {
    try {
        const {body} = req;
        const namespace = await Models.Namespace.create({
            name: body.namespace,
            slug: body.slug
        })

        for (const {locale, data} of body.imports) {
            const language = await Models.Language.findOne({where: {locale: locale}})
            for (const translationKey in data) {
                const [key, created] = await Models.Key.findOrCreate({
                    where: { 
                        key: translationKey,
                        namespace_id: namespace.id
                    },
                    defaults: {
                        key: translationKey,
                        namespace_id: namespace.id
                    }
                });

                const translation = await Models.Translation.create({
                    key_id: key.id,
                    locale_id: language.id,
                    text: data[translationKey]
                })
                
            }
        }

        res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            data: null
        })
    }
}