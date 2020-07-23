// Incluir o express e path
const express = require("express");
const path = require("path");

// Incluindo rotas
const staticRouter = require("./routes/staticRoutes");

// Criando o app
const app = express();

// Utilizando as rotas
app.use("/", staticRouter);

// Definindo EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Definindo diretório padrão para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Iniciando o servidor web;
app.listen(3001, () => {
  console.log("Linten on port 3001");
  console.log("Access http://localhost:3001");
});
