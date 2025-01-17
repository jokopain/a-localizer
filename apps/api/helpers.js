const {Op} = require("sequelize");
exports.findQueryBuilder = (search) => {
    let where = {};
    if(search){
        where = {
            [Op.or]: search.in.map( item => ({
                [item]: {[Op.iLike]: `%${search.str}%`}
            }))
        }
    }
    return where;
}