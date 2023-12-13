import joi from 'joi';
import imgSchema from '../imgSchema.js';

const editUserAvatarSchema = joi.object({
    avatar: imgSchema.required()
});

export default editUserAvatarSchema;