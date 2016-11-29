"use strict"

const fs = require("fs");
const path = require("path");

module.exports = function(app) {
    fs.readdirSync("./server/config/routers")
        .filter(x => x.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app);
        });
};