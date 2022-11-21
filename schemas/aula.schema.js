const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()
                  .min(3)
                  .max(15);
const nivel = Joi.string()
                  .min(8)
                  .max(8);
const cantidadAlumnos = Joi.number()
                  .integer()
                  .min(22)
                  .max(40);
const createAulaSchema = Joi.object({
  nombre: nombre.required(),
  nivel: nivel.required(),
  cantidadAlumnos: cantidadAlumnos.required()
});

const updateAulaSchema = Joi.object({
  nombre: nombre,
  nivel: nivel,
  cantidadAlumnos: cantidadAlumnos.required()
});

const getAulaSchema = Joi.object({
  id: id.required()
});

module.exports = { createAulaSchema, updateAulaSchema, getAulaSchema }
