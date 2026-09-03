import mongoose from "mongoose";

let Schema = mongoose.Schema;

const noticiaSchema = new Schema({
    noticia: String,
    contagem_mais_lidas: Number
},{collection:'noticias_mais_lidas'});

export { noticiaSchema };