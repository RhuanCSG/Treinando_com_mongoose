import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros
      .findById(id, {}, { autopopulate: false })
      .populate("autor");
      if (livro) res.status(200).send(livro);
      else next(new ErroNaoEncontrado("Livro não encontrado!"));
    } catch (error) {
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });
      const livroAtualizado = await livros.findById(id);
      if (livroAtualizado)
        res.status(200).send({
          message: `Livro atualizado com sucesso!`,
          livro: livroAtualizado,
        });
      else
        next(
          new ErroNaoEncontrado(
            "Não foi possível atualizar o registro. Livro não encontrado!"
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndDelete(id);
      if (livro)
        res.status(200).send({ message: "Livro excluído com sucesso!" });
      else
        next(
          new ErroNaoEncontrado(
            "Não foi possível deletar o registro. Livro não encontrado!"
          )
        );
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
