import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O parâmetro 'título' do livro é obrigatório"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O parâmetro 'Autor' do livro é obrigatório"],
    autopopulate: { select: "nome" }
  },
  editora: {
    type: String,
    required: [true, "O parâmetro 'editora' do livro é obrigatório"],
    enum: {
      values: ["Editora B", "Editora A"],
      message: "Não é permitido cadastrar um livro da editora {VALUE}",
    },
  },
  numeroPaginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000"],
  },
});

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;
