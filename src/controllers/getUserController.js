const getUserController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented',
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función.
export default getUserController;
