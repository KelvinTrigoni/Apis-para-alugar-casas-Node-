import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    email: String
});

export default model('Usuario', usuarioSchema);