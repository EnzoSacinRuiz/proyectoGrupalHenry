const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
{
    sequelize.define("Fitness",
    {
        id:             //  UUIDV4
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:           //  STRING
        {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        isActive:       //  defaultValue: true
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        image:          //  STRING
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand:          //  STRING
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        price:          //  INTEGER
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        variation:      //  ARRAY(STRING)
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        description:    //  TEXT
        {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, { timestamps: false, freezeTableName: true } )
}