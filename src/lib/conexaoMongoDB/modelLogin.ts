import mongoose from "mongoose";

let Schema = mongoose.Schema;

const loginSchema = new Schema({
    usuario: String,
    senha: String    
},{collection:'Login'});

export { loginSchema };