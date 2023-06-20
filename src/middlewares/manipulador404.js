import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

function manipulador404 (req, res, next) {
    const naoEncontrado = new ErroNaoEncontrado();
    next(naoEncontrado);
}

export default manipulador404;