const express = require('express');
const router = express.Router();
const validatorHandler = require('./../midlewares/validator.handler')
const { createAulaSchema, updateAulaSchema, getAulaSchema } = require('./../schemas/aula.schema')
const AulaService = require('./../services/aula.service');
const service = new AulaService();

router.get('/', async (req, res) =>{
  const aulas = await service.find();
  res.status(200).json(aulas);
});

router.get('/:id',
            validatorHandler(getAulaSchema, 'params'),
            async (req, res, next) =>{
  try{
    const{ id } = req.params;
    const aula = await service.findOne(id);
    res.status(200).json(aula)
  }catch(error){
    next(error);
  }
  });


router.post('/',
            validatorHandler(createAulaSchema, 'body'),
            async (req,res) =>{
  const body = req.body;
  const nuevaAula = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevaAula
  })
});

router.patch('/:id',
              validatorHandler(getAulaSchema, 'params'),
              validatorHandler(updateAulaSchema, 'body'),
              async (req,res,next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const aula = await service.update(id,body);
    res.status(200).json({
      message: 'Actualizado',
      aula
    });
  } catch(error){
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getAulaSchema, 'params'),
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

