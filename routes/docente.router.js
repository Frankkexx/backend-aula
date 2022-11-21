const express = require('express');
const router = express.Router();
const validatorHandler = require('./../midlewares/validator.handler')
const { createDocenteSchema, updateDocenteSchema, getDocenteSchema } = require('./../schemas/docente.schema')
const DocenteService = require('./../services/docente.service');
const service = new DocenteService();

router.get('/', async (req, res) =>{
  const docentes = await service.find();
  res.status(200).json(docentes);
});

router.get('/:id',
            validatorHandler(getDocenteSchema, 'params'),
            async (req, res, next) =>{
  try{
    const{ id } = req.params;
    const docente = await service.findOne(id);
    res.status(200).json(docente)
  }catch(error){
    next(error);
  }
  });


router.post('/',
            validatorHandler(createDocenteSchema, 'body'),
            async (req,res) =>{
  const body = req.body;
  const nuevoDocente = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoDocente
  })
});

router.patch('/:id',
              validatorHandler(getDocenteSchema, 'params'),
              validatorHandler(updateDocenteSchema, 'body'),
              async (req,res,next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const docente = await service.update(id,body);
    res.status(200).json({
      message: 'Actualizado',
      docente
    });
  } catch(error){
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getDocenteSchema, 'params'),
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

