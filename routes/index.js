const express = require('express')
const alumnosRouter = require('./alumno.router')
const docentesRouter = require('./docente.router')
const aulaRouter = require('./aula.router')

function routerApi(app){
  const routerV1 = express.Router();
  app.use('/api/v1', routerV1);
  routerV1.use('/alumnos', alumnosRouter);
  routerV1.use('/docentes', docentesRouter);
  routerV1.use('/aulas', aulaRouter)
}

module.exports = routerApi
