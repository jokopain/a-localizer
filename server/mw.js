
const jwt = require('jsonwebtoken');
const config = require("./config");
const {JWT_SECRET} = config;
const Models = require("./models");
const Validator = require("schema-validator")
const _ = require("lodash");

const MAX_LIMIT = 1001;

exports.isAuth = async (req, res, next) => {
    const token = req.body.token || req.query.token;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await Models.User.findOne({
            where: {
                username: decoded.username
            }
        })
        if(user){
            req.__current_username = decoded.username
            next()
        } else {
            res.status(401).json({
                status: 401,
                data: null,
                message: "Unauthorized"
            })
        }
    } catch(err) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
    }
}


const validate = async (schema, data) => {
    const validator = new Validator(schema);
    const check = validator.check(data);

    if(check._error){
        return {isValid: false, errors: _.omit(check, "_error")}
    } else {
        const errors = {}
        for (const key in schema) {
            if("custom" in schema[key]){
                let isInvalid = await schema[key].custom(data[key], data?.id || null)
                if(isInvalid) {
                    const [type, msg] = isInvalid.split(":")
                    errors[key] = {
                        [type]: {
                            message: msg
                        }
                        
                    }
                }
            }
        }

        if(Object.keys(errors).length){
            return {isValid: false, errors: errors}
        } else {
            return {isValid: true, errors: null}
        }
        
    }
}

exports.isValid = (schema) => async (req, res, next) => {
    const {body} = req;
    if(Array.isArray(body)){
        for (const entry of body) {
            const result = await validate(schema, entry);
            if(!result.isValid){
                return res.status(400).json({
                    message: "Validation Error",
                    status: 400,
                    data: result.errors
                })
            }
        }
    } else {
        const result = await validate(schema, body);
        if(!result.isValid){
            return res.status(400).json({
                message: "Validation Error",
                status: 400,
                data: result.errors
            })
        }
    }
    
    next()
}

exports.isLimitValid = (req, res, next) => {
    if(req.body.limit > MAX_LIMIT){
        res.status(400).json({
            status: 400,
            message: `You reached the server max limit: ${MAX_LIMIT}`
        })
    } else {
        next();
    }
}

exports.isAPIKeyValid = async (req, res, next) => {
    const {key} = req.params;
    const isExist = await Models.APIKey.findOne({where: {api_key: key}});
    if(isExist){
        next()
    } else {
        res.status(401).json({
            status: 401,
            message: "Unauthorized, Invalid API key"
        })
    }
}