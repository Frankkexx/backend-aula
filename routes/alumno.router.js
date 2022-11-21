const express = require('express');
const router = express.Router();
const validatorHandler = require('./../midlewares/validator.handler')
const { createAlumnoSchema, updateAlumnoSchema, getAlumnoSchema } = require('./../schemas/alumno.schema')
const AlumnoService = require('./../services/alumno.service');
const service = new AlumnoService();

router.get('/', async (req, res) =>{
  const alumnos = await service.find();
  res.status(200).json(alumnos);
});

router.get('/:id',
            validatorHandler(getAlumnoSchema, 'params'),
            async (req, res, next) =>{
  try{
    const{ id } = req.params;
    const alumno = await service.findOne(id);
    res.status(200).json(alumno)
  }catch(error){
    next(error);
  }
  });


router.post('/',
            validatorHandler(createAlumnoSchema, 'body'),
            async (req,res) =>{
  const body = req.body;
  const nuevoAlumno = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoAlumno
  })
});

router.patch('/:id',
              validatorHandler(getAlumnoSchema, 'params'),
              validatorHandler(updateAlumnoSchema, 'body'),
              async (req,res,next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const alumno = await service.update(id,body);
    res.status(200).json({
      message: 'Actualizado',
      alumno
    });
  } catch(error){
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getAlumnoSchema, 'params'),
              async (req,res,next)=>{
  try{
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json({
      message: 'Eliminado',
      rta
    })
  }catch(error){
    next(error);
  }

})
module.exports = router;

