// Postear una foto
app.post('/post', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'fotoplat');

    const postData = {
        user_id: decoded.id,
        image: req.file.path,
        description: req.body.description,
    };

    db.query('INSERT INTO posts SET ?', postData, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ error: 'Error creando la publicación' });
        }

        res.status(201).json({ message: 'Publicación creada correctamente' });
    });
});

// Hacer un like a una foto
app.post('/like/:post_id', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'fotoplat');

    const likeData = {
        user_id: decoded.id,
        post_id: req.params.post_id,
    };

    db.query('INSERT INTO likes SET ?', likeData, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ error: 'Error al dar like a la foto' });
        }

        res.status(201).json({ message: 'Like agregado correctamente' });
    });
});

// Quitar un like a una foto
app.delete('/like/:post_id', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'fotoplat');

    db.query(
        'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
        [decoded.id, req.params.post_id],
        (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: 'Error al quitar el like de la foto' });
            }

            res.status(200).json({ message: 'Like eliminado correctamente' });
        },
    );
});
