const Models = require("../models");
const _ = require("lodash");
const {findQueryBuilder} = require("../helpers");
exports.create = async (req, res) => {
    try {
        const {body} = req;
        
        const created = await Models.User.create({
            ...body,
            hashed_password: Models.User.generatePasswordHash(body.password)
        })

        if(created){
            const user = await Models.User.findOne({
                where: {
                    username: created.username
                },
                include: ["rules"],
                attributes: {
                    exclude: ["hashed_password"]
                }
            })
            res.status(200).json({
                status: 200,
                data: {
                    ...user.dataValues,
                    rules: Models.User.formateRules(user.rules)
                }
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Bad Request",
                data: null
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            data: null
        })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const {body} = req;
        const password = body?.password;

        const fields = {..._.omit({...body}, ["password", "username"])}

        
        const user = await Models.User.findOne({ where: {id}});

        if(!user){
            res.status(400).json({
                status: 400,
                message: "User not found",
                data: null
            })
        }

        if(password && Models.User.generatePasswordHash(password) !== user.hashed_password){
            fields.hashed_password = Models.User.generatePasswordHash(password);
        }
        
        await user.update(fields)
        await user.save(fields)

        res.status(200).json({
            status: 200,
            data: {
                ..._.omit({...user.dataValues}, "hashed_password")
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

exports.find = async (req, res) => {
    try {
        const {limit, offset, search = null, sort = "id:desc"} = req.body;
        const [orderBy, orderDir] = sort.split(":");
        const users = await Models.User.findAndCountAll({
            where: findQueryBuilder(search),
            limit,
            offset,
            order: [[orderBy, orderDir.toUpperCase()]],
            attributes: {
                exclude: ["hashed_password"]
            }
        })
        res.status(200).json({
            status: 200,
            data: {
                items: users.rows,
                total: users.count
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