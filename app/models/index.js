const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

//pool de conexion
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    //dialectOptions: {ssl:true},
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//importacion de modelos
db.clientes = require("./clientes.model.js")(sequelize, Sequelize);
db.empleados = require("./empleados.model.js")(sequelize, Sequelize);
db.proveedores = require("./proveedores.model.js")(sequelize, Sequelize);

module.exports = db;