import Usuario from '../models/Usuario';
import * as Yup from 'yup';
export default {
    async store(req, res) {
        var schema = Yup.object().shape({
            email: Yup.string().email().required()
        });
        var usuario
        var email = req.body.email;
        if ((await schema.isValid(req.body))) {
            usuario = await Usuario.findOne({ email });
            if (!usuario) {
                usuario = await Usuario.create({ email });
            }
            return res.json({ usuario });
        } else {
            return res.status(400).json({ Mensagem: 'Erro' });
        }
    }
}