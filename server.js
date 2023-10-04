const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const port = 4000;
var corsOptions = { origin: "http://localhost:3000" };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        console.log("-----db sicronizada");
    })
    .catch((err) => {
        console.log("-----error al sincronizar db: " + err.message);
    });

//root
app.get("/", (req, res) => {
    res.json({ message: "API para el proyecto" });
});

require("./app/routes/clientes.routes")(app);
require("./app/routes/proveedores.routes")(app);
require("./app/routes/empleados.routes")(app);

app.listen(port, () => {
    console.log(`-----Server is running on port ${port}.`);
});

