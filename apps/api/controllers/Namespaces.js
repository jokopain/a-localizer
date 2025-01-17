const Models = require("../models")
const {findQueryBuilder} = require("../helpers");

exports.find = async (req, res) => {
    const {sort = "id:desc", search = null} = req.body;
    const [orderBy, orderDir] = sort.split(":");

    try {
        const namespaces = await Models.Namespace.findAndCountAll({
            where: findQueryBuilder(search),
            order: [[orderBy, orderDir.toUpperCase()]]
        })

        res.status(200).json({
            status: 200,
            data: {
                items: namespaces.rows,
                total: namespaces.count
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
    const {slug} = req.params;
    try {
        const namespace = await Models.Namespace.findOne({where: {slug}});
        if(!namespace){
            res.status(404).json({
                status: 404,
                message: "Namespace not found",
                data: null
            })
        }
        res.status(200).json({
            status: 200,
            data: namespace
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
        const namespace = await Models.Namespace.create(body);
        res.status(200).json({
            status: 200,
            data: namespace
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
    const {slug} = req.params;
    try {
        const namespace = await Models.Namespace.findOne({where: {slug}});
        if(!namespace){
            res.status(404).json({
                status: 404,
                message: "Namespace not found",
                data: null
            });
        }
        await namespace.update(body);
        await namespace.save();
        res.status(200).json({
            status: 200,
            data: namespace
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
