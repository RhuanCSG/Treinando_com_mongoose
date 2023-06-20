import mongoose from "mongoose";

// Validação global para não permitir strings vazias
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});