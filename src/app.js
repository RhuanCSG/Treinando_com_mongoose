import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/ManipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});
// Aplicação Express
const app = express();
// Define json como padrão de requisições
app.use(express.json());
// Rotas do index.js
routes(app);
// Middleware para Not Found pages
app.use(manipulador404);
// Middleware de erros
app.use(manipuladorDeErros);

export default app;
