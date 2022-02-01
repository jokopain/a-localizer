const Models = require("../models");
const {findQueryBuilder} = require("../helpers");
const _ = require("lodash")
exports.create = async (req, res) => {
    const {body} = req;
    try {
        const namespace = await Models.Namespace.findOne({where: {slug: body.namespace}});
        const language = await Models.Language.findOne({where: {locale: body.language}});

        const crated = await Models.Translation.create({
            key: body.key,
            text: body.text,
            namespace_id: namespace.id,
            language_id: language.id,
        })

        res.status(200).json({
            status: 200,
            data: crated,
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
    try {
        const {id} = req.params;
        
        const translation = await Models.Translation.findOne({
            where: {id}
        })

        await translation.update({ ...req.body })
        await translation.save()
        
        res.status(200).json({
            status: 200,
            data: translation
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
    const {
        namespace, 
        language, 
        limit = 5, 
        offset = 0, 
        sort = "id:desc",
        search = null
    } = req.body
    try {
        const [orderBy, orderDir] = sort.split(":");
        const ns = await Models.Namespace.findOne({where: {slug: namespace}});
        // const lang = await Models.Language.findOne({where: {locale: language}});

        const keys = await Models.Key.findAndCountAll({
            where: {
                ...findQueryBuilder(search ? {in: ["key"], str: search} : null),
                namespace_id: ns.id,
                // language_id: lang.id
            },
            include: {
                association: "translations",
                attributes: ["text"],
                include: ["locale"]
            },
            // distic
            distinct: true,
            limit,
            offset,
            order: [[orderBy, orderDir.toUpperCase()]]
        })

        res.status(200).json({
            status: 200,
            data: {
                items: keys.rows,
                total: keys.count
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



exports.bulkUpdate = async (req, res) => {
    try {
        for (const entry of req.body) {
            const key = await Models.Key.findOne({where: {id: entry.id}});
            key.key = entry.key;
            
            for (const entryKey in entry) {
                if(["key", "id"].includes(entryKey)){
                    continue
                } else if(entryKey.includes(":")){
                    const [lang] = entryKey.split(":");
                    const locale = await Models.Language.findOne({where: {locale: lang}});
                    const found = await Models.Translation.findOne({where: {
                        key_id: key.id,
                        locale_id: locale.id
                    }})
                    if(found){
                        await found.update({text: entry[entryKey]})
                    } else {
                        await Models.Translation.create({
                            key_id: key.id,
                            locale_id: locale.id,
                            text: entry[entryKey]
                        })
                    }
                }
            }
            await key.save();
        }
        res.status(200).json({
            status: 200,
            data: {
                success: true
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


exports.bulkCreate = async (req, res) => {
    try {
        for (const entry of req.body) {
            const namespace = await Models.Namespace.findOne({where: {slug: entry.namespace}})
            const key = await Models.Key.create({
                key: entry.key,
                namespace_id: namespace.id
            })

            for (const entryKey in entry) {
                if(["key", "id", "namespace"].includes(entryKey)){
                    continue
                } else if(entryKey.includes(":")){
                    const [lang] = entryKey.split(":");
                    const locale = await Models.Language.findOne({where: {locale: lang}});
                    await Models.Translation.create({
                        text: entry[entryKey],
                        key_id: key.id,
                        locale_id: locale.id
                    })
                }
            }
        }
        res.status(200).json({
            status: 200,
            data: {
                success: true
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

exports.bulkRemove = async (req, res) => {
    try {
        for (const entry of req.body) {
           const key = await Models.Key.findOne({where: {id: entry.id}})
           await key.destroy()
        }
        res.status(200).json({
            status: 200,
            data: {
                success: true
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