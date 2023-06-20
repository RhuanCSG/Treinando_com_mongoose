import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor) res.status(200).send(autor);
      else next(new ErroNaoEncontrado("Autor não encontrado!"));
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });
      const autorAtualizado = await autores.findById(id);
      if (autorAtualizado)
        res.status(200).send({ message: "Autor atualizado com sucesso! " });
      else
        next(
          new ErroNaoEncontrado(
            "Não foi possível atualizar o registro. Autor não encontrado!"
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);
      if (autor)
        res.status(200).send({ message: "Autor excluído com sucesso!" });
      else
        next(
          new ErroNaoEncontrado(
            "Não foi possível deletar o registro. Autor não encontrado!"
          )
        );
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;
