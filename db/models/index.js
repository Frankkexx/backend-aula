const { ALUMNO_TABLE, AlumnoSchema, Alumno } = require('./alumno.model')

function setupModels(sequelize){
    Alumno.init(AlumnoSchema, Alumno.config(sequelize))
}

module.exports = setupModels