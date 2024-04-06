const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
{
    sequelize.define("Activity",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        isActive:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        name:
        {
            type:DataTypes.STRING(50),
            allowNull: false
        },
        gender:
        {
            type: DataTypes.ENUM( 'Male', 'Female' ),
            allowNull: false,
        },
        objective:
        {
            type: DataTypes.ENUM('Perder peso', 'Ganar peso', 'Mantener peso', 'Focalizado'),
            allowNull: false,
        },
        w2m:
        {
            type: DataTypes.ENUM( '[1-5]', '[5-10]', '[10+]' ),
            allowNull: true,
        },
        focalizedArea:
        {
            type: DataTypes.ENUM( 'Hombros', 'Espalda', 'Brazos', 'Piernas' ),
            allowNull: true
        },
        weeklyFrequency:
        {
            type: DataTypes.ENUM( '3', '4', '5' ),
            allowNull: true
        },
        sessionIntensity:
        {
            type: DataTypes.ENUM( 'Ligera', 'Media', 'Intensa' ),
            allowNull: true
        },
        description:
        {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {/*balcony, atRoof, mFridge, security*/}
        },
    }, { timestamps: false } )
}