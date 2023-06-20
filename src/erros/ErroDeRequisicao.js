import ErroBase from "./ErroBase.js";

class ErroDeRequisicao extends ErroBase {
    constructor(mensagem = "Um ou mais parâmetros informados estão incorretos"){
        super(mensagem, 400);
    }
}

export default ErroDeRequisicao;