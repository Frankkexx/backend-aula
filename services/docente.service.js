const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
const boom = require('@hapi/boom')

class DocenteService{

  constructor(){
    this.docentes = [];
    this.generate(10);

  }

  generate(limite){
    for (let index=0; index<limite; index++){
      this.docentes.push({
        id: crypto.randomUUID(),
        nombre: 'docente ' + index,
        curso: 'curso ' + (index +1) ,
      })
    }
  }

  create(data){
    const nuevoDocente = {
      id: crypto.randomUUID(),
      ...data
    };
    this.docentes.push(nuevoDocente);
    return nuevoDocente;
  }

  async find(){
    return this.docentes
  }

  async findOne(id){
    const docente =  this.docentes.find(docente => {
      return docente.id === id;
    });
    if (!docente){
      throw boom.notFound('docente No encontrado');
    }
    return docente;
  }

  async update(id, changes ){
    const index = this.docentes.findIndex(docente => {
      return docente.id === id;
    })
    if (index === -1){
      throw boom.notFound('docente No encontrado');
    }
    const docente = this.docentes[index];
    this.docentes[index] = {
      ...docente,
      ...changes
    };
    return this.docentes[index]
  }

  async delete(id){
    const index = this.docentes.findIndex(docente => {
      return docente.id === id;
    })
    if (index === -1){
      throw boom.notFound('docente No encontrado');
    }
    this.docentes.splice(index, 1);
    return { id }

  }
}

module.exports = DocenteService;
