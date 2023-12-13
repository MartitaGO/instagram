import { lookPhoto } from '../../controllers/entries.controller.js';

const main = async (req, res, next) => {
    try {
        await lookPhoto(req.entry, req.params.photoId)

        res.send({
            status: 'ok',
            message: 'Aquí tienes el listado de fotos',
        });

    } catch (err) {
        next(err);
    }
}

export default main;
