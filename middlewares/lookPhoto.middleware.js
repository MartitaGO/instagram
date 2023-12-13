<<<<<<< HEAD
import { lookPhotos } from '../controllers/posts.controller.js';

const main = async (req, res, next) => {
    try { 
        //TODO: Agregar validaciones
        const { texto } = req.body
        const photos = await lookPhotos(texto)
=======
import { lookPhoto } from '../../controllers/entries.controller.js';

const main = async (req, res, next) => {
    try {
        await lookPhoto(req.entry, req.params.photoId)
>>>>>>> 8d7ff18bc3cf0f1dbbcd1a1500ab67fd2ba95ec1

        res.send({
            status: 'ok',
            message: 'Aquí tienes el listado de fotos',
<<<<<<< HEAD
            data: {photos}
=======
>>>>>>> 8d7ff18bc3cf0f1dbbcd1a1500ab67fd2ba95ec1
        });

    } catch (err) {
        next(err);
    }
}

export default main;
