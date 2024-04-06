const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
{
    sequelize.define("Indumentary",
    {
        id:
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
        isActive:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:           //  ('Shoe', 'Shirt')
        {
            type: DataTypes.ENUM('Shoe', 'Shirt'),
            allowNull: false
        },
        price:          //  INTEGER
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:    //  TEXT
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        size:           //  STRING
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, { timestamps: false, freezeTableName: true } )
}