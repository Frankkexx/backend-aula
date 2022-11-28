const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');
// const { query } = require('express');

class AlumnoService{

  constructor(){
    this.alumnos = [];
    this.generate(10);

  }

  generate(limite){
    for (let index=0; index<limite; index++){
      this.alumnos.push({
        id: crypto.randomUUID(),
        nombre: 'alumno ' + index,
        grado: (5 + Math.floor(Math.random()*(1 - 5) + 1)) + ' grado',
        edad: (12 + Math.floor(Math.random()*(7 - 12))) + ' años'
      })
    }
  }

  async create(data){
    const nuevoAlumno = {
      id: crypto.randomUUID(),
      ...data
    };
    const salida = await models.Alumno.create(nuevoAlumno);
    return salida;
  }

  async find(){
    const salida = await models.Alumno.findAll();
    return salida;
    
  };

  async findOne(id){
    const alumno = await models.Alumno.findByPk(id);
    if (!alumno){
      throw boom.notFound('Alumno no encontrado');
    }
    return alumno; 
  }

  async update(id, changes ){
    const alumno = await this.findOne(id);
    const salida = await alumno.update(changes);
    return salida;
    // const index = this.alumnos.findIndex(alumno => {
    //   return alumno.id === id;
    // })
    // if (index === -1){
    //   throw boom.notFound('alumno No encontrado');
    // }
    // const alumno = this.alumnos[index];
    // this.alumnos[index] = {
    //   ...alumno,
    //   ...changes
    // };
    // return this.alumnos[index]
  }

  async delete(id){
    const alumno = await this.findOne(id);
    await alumno.destroy();
    return { id };
    // const index = this.alumnos.findIndex(alumno => {
    //   return alumno.id === id;
    // })
    // if (index === -1){
    //   throw boom.notFound('alumno No encontrado');
    // }
    // this.alumnos.splice(index, 1);
    // return { id }

  }
}

module.exports = AlumnoService;
