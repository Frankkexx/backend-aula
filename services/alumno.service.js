const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
const boom = require('@hapi/boom')

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

  create(data){
    const nuevoAlumno = {
      id: crypto.randomUUID(),
      ...data
    };
    this.alumnos.push(nuevoAlumno);
    return nuevoAlumno;
  }

  async find(){
    return this.alumnos
  }

  async findOne(id){
    const alumno =  this.alumnos.find(alumno => {
      return alumno.id === id;
    });
    if (!alumno){
      throw boom.notFound('alumno No encontrado');
    }
    return alumno;
  }

  async update(id, changes ){
    const index = this.alumnos.findIndex(alumno => {
      return alumno.id === id;
    })
    if (index === -1){
      throw boom.notFound('alumno No encontrado');
    }
    const alumno = this.alumnos[index];
    this.alumnos[index] = {
      ...alumno,
      ...changes
    };
    return this.alumnos[index]
  }

  async delete(id){
    const index = this.alumnos.findIndex(alumno => {
      return alumno.id === id;
    })
    if (index === -1){
      throw boom.notFound('alumno No encontrado');
    }
    this.alumnos.splice(index, 1);
    return { id }

  }
}

module.exports = AlumnoService;
