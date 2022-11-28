const { date } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const ALUMNO_TABLE =  'alumnos';

const AlumnoSchema = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    grado: {
        allowNull: false,
        type: DataTypes.INTEGER 
    },
    edad:{
        allowNull: false,
        type: DataTypes.INTEGER 
    },
    createAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}
class Alumno extends Model{
    static associate(){

    }

    static config(sequelize){
        return{
            sequelize,
            tableName: ALUMNO_TABLE,
            modelName: 'Alumno',
            timestamps: false
        }
    }
}
module.exports = { ALUMNO_TABLE, AlumnoSchema, Alumno }