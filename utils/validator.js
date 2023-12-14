const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const schemas = {
  signup: Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required(),
  }),
  signin: Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    username: Joi.string(),
    password: Joi.string().required(),
  }),
  addTask: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
  }),
  updateTask: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.date(),
    status: Joi.boolean(),
  }),
};

module.exports = {
  schemas,
};
