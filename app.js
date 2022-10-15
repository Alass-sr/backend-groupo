const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message");
const userRoutes = require('./routes/user');

const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("./api/message", messageRoutes);
app.use("/api/auth", userRoutes);



app.use(express.json());

// Middleware CORS

// routes
// app.use("/api/user", userRoutes);

module.exports = app;
