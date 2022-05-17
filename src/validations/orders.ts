import Joi from 'joi';

const create = Joi.object({
  productsIds: Joi.array()
    .items(
      Joi.number(),
    )
    .required(),
});

export default create;