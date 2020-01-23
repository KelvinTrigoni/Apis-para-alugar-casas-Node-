import Casa from '../models/Casa'

export default {
    async show(req, res) {
        var id = req.headers.usuarioid;

        var casas = await Casa.find({ usuario: id });

        return res.json(casas)
    }
}