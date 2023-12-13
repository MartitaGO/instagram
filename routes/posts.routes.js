import express from 'express'

import lookPhotos from '../middlewares/lookPhoto.middleware.js';

const router = express.Router();

router.get('/photos/look', lookPhotos)

export default router;