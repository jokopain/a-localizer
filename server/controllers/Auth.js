const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const Models = require("../models");
const _ = require("lodash");

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await Models.User.findOne({
            where: {
                username
            }
        })
        if(!user) {
            res.status(400).json({
                status: 400,
                data: null,
                message: "Invalid username/password"
            })
        }

        const hashed_password = Models.User.generatePasswordHash(password);
        if(hashed_password === user.hashed_password){
            const token = jwt.sign({ username: user.username }, JWT_SECRET);
            res.status(200).json({
                status: 200,
                data: {
                    token: token
                }
            })
        } else {
            res.status(400).json({
                status: 400,
                data: null,
                message: "Invalid username/password"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error!"
        })
    }
}

exports.me = async (req, res) => {
    const {__current_username} = req;
    try {
        const user = await Models.User.findOne({
            where: {
                username: __current_username
            },
            include: ["rules"],
            attributes: {
                exclude: ["hashed_password"]
            }
        })

        if(!user){
            res.status(400).json({
                status: 400,
                message: "Bad Request",
                data: null
            })
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    ...user.dataValues,
                    rules: Models.User.formateRules(user.rules)
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            data: null
        })
    }

}

exports.selfEdit = async (req, res) => {
    try {
        const user = await Models.User.findOne({
            where: {username: req.__current_username},
            include: ["rules"],
        });
        const {body} = req;

        const to_update = {...body};
        delete to_update.password

        if(body.password && body.password !== ""){
            to_update.hashed_password = Models.User.generatePasswordHash(body.password);
        }

        await user.update(_.omit(to_update, ["role", "username"]));
        await user.save();


        res.status(200).json({
            status: 200,
            data: {
                ..._.omit({...user.dataValues}, "hashed_password"),
                rules: Models.User.formateRules(user.rules)
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
