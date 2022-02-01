const Models = require("../models");

exports.find = async (req, res) => {
    try {
        const keys = await Models.APIKey.findAll();
        res.status(200).json({
            status: 200,
            data: keys
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