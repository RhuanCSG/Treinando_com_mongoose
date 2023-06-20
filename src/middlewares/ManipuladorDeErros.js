import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js"
import ErroDeRequisicao from "../erros/ErroDeRequisicao.js";
import ErroDeValidacao from "../erros/ErroDeValidacao.js";
import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

function manipuladorDeErros(error, req, res, next) {
    console.log(error)
  if (error instanceof mongoose.Error.CastError) {
    new ErroDeRequisicao().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroDeValidacao(error).enviarResposta(res)
  } else if (error instanceof ErroNaoEncontrado){
    error.enviarResposta(res);
  }
  else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
