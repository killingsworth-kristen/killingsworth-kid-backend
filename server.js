const express = require('express');
const routes = require('./routes');
const cors = require("cors")
// import sequelize connection
const sequelize = require(`./config/connection`)

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);

// app.use((routes, next) => {
//   routes.setHeader("Access-Control-Allow-Origin", "*");
//   routes.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});