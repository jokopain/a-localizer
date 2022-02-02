const Models = require("../models");

exports.get = async (req, res) => {
    try {
        const {locale, ns} = req.params;
        const language = await Models.Language.findOne({where: {locale}});
        const namespace = await Models.Namespace.findOne({where: {slug: ns}});
        if(!namespace || !language){
            return res.status(200).json(null)
        }

        const translation = await Models.Translation.findAll({
            where: {
                locale_id: language.id,
            },
            include: {
                association: "key",
                where: {
                    namespace_id: namespace.id
                }
            }
        })

        const result = {};

        for (const translate of translation) {
            result[translate.key.key] = translate.text
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