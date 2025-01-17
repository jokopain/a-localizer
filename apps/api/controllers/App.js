const Models = require("../models");

exports.statistics = async (req, res) => {
    try {
        const namespaces = await Models.Namespace.count();
        const users = await Models.User.count();
        const locales = await Models.Language.count();
        const keys = await Models.Key.count();

        res.status(200).json({
            status: 200,
            data: {
                namespaces,
                users,
                locales,
                keys 
            }
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