import { lookPhoto } from '../controllers/postsController.js';

const main = async (req, res, next) => {
    try {
        await lookPhoto(req.entry, req.params.photoId);

        res.send({
            status: 'ok',
            message: 'Aquí tienes el listado de fotos',
            // preguntar data: {photos}
        });
    } catch (err) {
        next(err);
    }
};

export default main;
