const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()
                  .alphanum()
                  .min(3)
                  .max(15);
const curso = Joi.string()
                  .min(2)
                  .max(20)
const createDocenteSchema = Joi.object({
  nombre: nombre.required(),
  curso: curso.required()
});

const updateDocenteSchema = Joi.object({
  nombre: nombre,
  curso: curso
});

const getDocenteSchema = Joi.object({
  id: id.required()
});

module.exports = { createDocenteSchema, updateDocenteSchema, getDocenteSchema }
