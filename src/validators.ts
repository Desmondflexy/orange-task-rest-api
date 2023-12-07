import joi from 'joi';

export const createTask = joi.object().keys({
  title: joi.string().required().max(50),
  description: joi.string().required().max(255),
});

export const updateTask = joi.object().keys({
  title: joi.string().max(50),
  description: joi.string().max(255),
  status: joi.string().valid('pending', 'completed'),
});
