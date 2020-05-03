const Joi = require("@hapi/joi");

exports.registerValidation = (data) => {
   // Validation Schema
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(data);
};

exports.loginValidation = (data) => {
   // Validation Schema
   const schema = Joi.object({
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(data);
};
