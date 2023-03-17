const express = require('express');
const routes = require('./routes');
const cors = require("cors")
// import sequelize connection
const sequelize = require(`./config/connection`)

console.log("Loaded FLT")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  console.log(`sequelize sync ${PORT}`);
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});