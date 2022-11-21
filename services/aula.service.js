const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
const boom = require('@hapi/boom')

class AulaService{

  constructor(){
    this.aulas = [];
    this.generate(10);

  }

  generate(limite){
    for (let index=0; index<limite; index++){
      this.aulas.push({
        id: crypto.randomUUID(),
        nombre: 'aula ' + index,
        nivel: 'Primaria',
        cantidadAlumnos: (40 + Math.floor(Math.random()*(22 - 40))),
      })
    }
  }

  create(data){
    const nuevaAula = {
      id: crypto.randomUUID(),
      ...data
    };
    this.aulas.push(nuevaAula);
    return nuevaAula;
  }

  async find(){
    return this.aulas
    // setTimeout(()=> {
    //   return this.aulas;
    // },3000);
    // return new Promise((resolve, rejects)=>{
    //   setTimeout(() => {
    //     resolve(this.aulas);
    //   }, 3000);
    // });
  }

  async findOne(id){
    const aula =  this.aulas.find(aula => {
      return aula.id === id;
    });
    if (!aula){
      throw boom.notFound('aula No encontrado');
    }
    return aula;
  }

  async update(id, changes ){
    const index = this.aulas.findIndex(aula => {
      return aula.id === id;
    })
    if (index === -1){
      throw boom.notFound('aula No encontrado');
    }
    const aula = this.aulas[index];
    this.aulas[index] = {
      ...aula,
      ...changes
    };
    return this.aulas[index]
  }

  async delete(id){
    const index = this.aulas.findIndex(aula => {
      return aula.id === id;
    })
    if (index === -1){
      throw boom.notFound('aula No encontrado');
    }
    this.aulas.splice(index, 1);
    return { id }

  }
}

module.exports = AulaService;
