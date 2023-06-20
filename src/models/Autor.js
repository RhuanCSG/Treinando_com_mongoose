import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: [true, "O nome do Autor é obrigatório"]},
        nacionalidade: {
            type: String,
            validate: {
                validator: (nomeNacionalidade) => {
                    return nomeNacionalidade.toUpperCase() !== "ARGENTINA"
                },
                message: "Não é permitido cadastrar Autores argentinos"
            }
        }
    },
    {
        versionKey: false
    }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;