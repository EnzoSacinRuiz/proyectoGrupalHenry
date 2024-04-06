const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Carrito',
        {
            id:
            {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            suppId:
            {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true
            },
            indId:
            {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true
            },
            fitId:
            {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true
            }
        }, { timestamps: false });
    }