import ErroDeRequisicao from "./ErroDeRequisicao.js";

class ErroDeValidacao extends ErroDeRequisicao {
  constructor(error) {
    const mensagem = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagem}`); 
  }
}

export default ErroDeValidacao;