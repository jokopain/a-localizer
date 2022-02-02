
const config = require("./config");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require("morgan");
const express = require('express');
const port = config.APP_PORT || 3001;

const api = express();
api.use(cors({
    origin: ['http://localhost:3000', "http://localhost:3002"]
}));
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(morgan('dev'));

require('./routes')(api);

const REACT_ROUTES = [
    "/",
    "/dashboard",
    "/login",
    "/logout",
    "/namespace/*",
    "/settings/*",
    "/manage/*"
]

for (const route of REACT_ROUTES) {
    api.use(route, express.static('public'));
}

api.listen(port, () => {
    console.log(`A-Localize app listening on port ${port}`)
})