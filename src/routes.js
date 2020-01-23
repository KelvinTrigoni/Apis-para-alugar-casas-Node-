import { Router } from 'express';
import controllers from './controllers';
import multer from 'multer';
import configImage from '../config/upload';

const routes = new Router();
const image = multer(configImage);

routes.post('/sessao', controllers.Sessao.default.store);
routes.post('/casa', image.single('caminhoFoto'), controllers.Casa.default.store);
routes.get('/casas', controllers.Casa.default.index);
routes.put('/casa/:id', image.single('caminhoFoto'), controllers.Casa.default.update);
routes.delete('/casa/:id', controllers.Casa.default.destroy);
routes.get('/dash', controllers.Dashboard.default.show);
routes.post('/reservar/:id', controllers.Reserva.default.store);
routes.get('/reservas', controllers.Reserva.default.index);
routes.delete('/reservas/:id', controllers.Reserva.default.destroy);



export default routes;