const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()
                  .alphanum()
                  .min(3)
                  .max(15);
const edad = Joi.number()
                  .integer()
                  .min(7)
                  .max(12);
const grado = Joi.string()
                  .min(5)
                  .max(10);
const createAlumnoSchema = Joi.object({
  nombre: nombre.required(),
  grado: grado.required(),
  edad: edad.required()
});

const updateAlumnoSchema = Joi.object({
  nombre: nombre,
  grado: grado,
  edad: edad
});

const getAlumnoSchema = Joi.object({
  id: id.required()
});

module.exports = { createAlumnoSchema, updateAlumnoSchema, getAlumnoSchema }
