import Reserva from '../models/Reserva';
import Casa from '../models/Casa';

export default {
    async index(req, res) {
        var usuarioId = req.headers.usuarioid;
        var reservados = await Reserva.find({ usuario: usuarioId }).populate('casa');

        return res.json(reservados)
    },
    async store(req, res) {
        var usuarioId = req.headers.usuarioid;
        var casaId = req.params.id;
        var data = req.body.data;
        var casas = await Casa.find({ _id: casaId });
        if (casas && casas[0].status == 1 && (usuarioId != casas[0].usuario)) {
            var reserva = await Reserva.create({
                usuario: usuarioId,
                casa: casaId,
                data: data
            });

            await reserva.populate('casa').populate('usuario').execPopulate();

            return res.json(reserva);
        } else {
            return res.status(400).json({ Mensagem: 'Erro' });
        }
    },
    async destroy(req, res) {
        var usuarioId = req.headers.usuarioid;
        var reservaId = req.params.id;
        var reservados = await Reserva.find({ _id: reservaId })

        if (usuarioId == reservados[0].usuario) {
            var reserva = await Reserva.findOneAndDelete({ _id: reservaId });
            return res.json({ Mensagem: 'Excluido com sucesso' });
        } else {
            return res.json({ Mensagem: 'Erro' });
        }

    }
}