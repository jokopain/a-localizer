const Models = require("../models");

exports.get = async (req, res) => {
    try {
        const {locale, ns} = req.params;
        const language = await Models.Language.findOne({where: {locale}});
        const namespace = await Models.Namespace.findOne({where: {slug: ns}});

        const translation = await Models.Translation.findAll({
            where: {
                language_id: language.id,
                namespace_id: namespace.id 
            }
        })

        const result = {};

        for (const translate of translation) {
            result[translate.key] = translate.text
        }

        res.status(200).json(result)

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            data: null
        })
    }
}