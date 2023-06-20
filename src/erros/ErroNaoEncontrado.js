import ErroBase from "./ErroBase.js";

class ErroNaoEncontrado extends ErroBase{
    constructor (mensagem = "Página não encontrada!", status = 404){
        super(mensagem, status);
    }
}

export default ErroNaoEncontrado;