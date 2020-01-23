import Casa from '../models/Casa';
import Usuario from '../models/Usuario';
import * as Yup from 'yup';

export default {
    async index(req, res) {
        var { status } = req.body;
        var casas;
        if (status || status == 0) {
            casas = await Casa.find({ status });
        } else {
            casas = await Casa.find();
        }

        return res.json(casas);
    },
    async store(req, res) {
        var schema = Yup.object().shape({
            descricao: Yup.string().required(),
            preco: Yup.number().required(),
            local: Yup.string().required(),
            status: Yup.number().required()
        });
        var arquivo = req.file.filename;
        var db = req.body;
        var id = req.headers.usuarioid;
        if ((await schema.isValid(req.body))) {
            var casa = await Casa.create({
                usuario: id,
                caminhoFoto: arquivo,
                descricao: db.descricao,
                preco: db.preco,
                local: db.local,
                status: db.status
            });

            return res.json({ casa });
        } else {
            return res.status(400).json({ Mensagem: 'Erro' });
        }
    },
    async update(req, res) {
        var schema = Yup.object().shape({
            descricao: Yup.string().required(),
            preco: Yup.number().required(),
            local: Yup.string().required(),
            status: Yup.number().required()
        });
        if (req.file) {
            var arquivo = req.file.filename;
        }
        var db = req.body;
        var id = req.headers.usuarioid;
        var casaId = req.params.id;
        var usuarioCasa = await Casa.findById(casaId);
        if ((await schema.isValid(req.body))) {
            if (String(usuarioCasa.usuario) == String(id)) {
                var casa = await Casa.updateOne({ _id: casaId }, {
                    usuario: id,
                    caminhoFoto: arquivo ? arquivo : usuarioCasa.caminhoFoto,
                    descricao: db.descricao,
                    preco: db.preco,
                    local: db.local,
                    status: db.status
                });
                return res.json({ Mensagem: "Alterado com sucesso!" });
            } else {
                return res.status(401).json({ Mensagem: "Erro" });
            }
        } else {
            return res.status(400).json({ Mensagem: 'Erro' });
        }
    },
    async destroy(req, res) {
        var id = req.headers.usuarioid;
        var casaId = req.params.id;
        var usuarioCasa = await Casa.findById(casaId);

        if (usuarioCasa) {
            if (String(usuarioCasa.usuario) == String(id)) {
                await Casa.findByIdAndDelete({ _id: casaId });
                return res.status(200).json({ Mensagem: "Excluida" });
            } else {
                return res.status(401).json({ Mensagem: "Erro" });
            }
        } else {
            return res.status(200).json({ Mensagem: "Já excluida" });
        }
    }
}