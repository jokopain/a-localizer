const Models = require("../models");
const {findQueryBuilder} = require("../helpers");

exports.find = async (req, res) => {
    const { sort = "id:desc", search = null} = req.body;
    const [orderBy, orderDir] = sort.split(":");
    try {
        const langs = await Models.Language.findAndCountAll({
            where: findQueryBuilder(search),
            order: [[orderBy, orderDir.toUpperCase()]]
        })
        res.status(200).json({
            status: 200,
            data: {
                items: langs.rows,
                total: langs.count
            }
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            data: null
        })
    }

}

exports.findOne = async (req, res) => {
    const {locale} = req.params;
    try {
        const lang = await Models.Language.findOne({where: {locale}});
        if(!lang){
            res.status(404).json({
                status: 404,
                message: "Locale not found",
                data: null
            })
        }
        res.status(200).json({
            status: 200,
            data: lang
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

exports.create = async (req, res) => {
    const {body} = req;
    try {
        const lang = await Models.Language.create(body);
        res.status(200).json({
            status: 200,
            data: lang
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

exports.update = async (req, res) => {
    const {body} = req;
    const {locale} = req.params;
    try {
        const lang = await Models.Language.findOne({where: {locale}});
        if(!lang || !locale){
            res.status(404).json({
                status: 404,
                message: "Locale not found",
                data: null
            });
        }
        await lang.update(body);
        await lang.save();
        res.status(200).json({
            status: 200,
            data: lang
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
