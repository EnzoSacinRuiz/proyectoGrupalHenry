const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User',
        {
            id:
            {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            isAdmin:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            isActive:
            {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            username:
            {
                type: DataTypes.STRING(35),
                allowNull: false,
                unique: true
            },
            password:
            {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name:
            {
                type: DataTypes.STRING(45),
                allowNull: false,
                validate:
                {
                    isAlpha: true
                }
            },
            surname:
            {
                type: DataTypes.STRING(45),
                allowNull: false,
                validate:
                {
                    isAlpha: true
                }
            },
            img:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email:
            {
                type: DataTypes.STRING,
                allowNull: false,
                validate:
                {
                    isEmail: true
                }
            },
            telephone:
            {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            securityQuestion:
            {
                type: DataTypes.ENUM('Nombre de su primera mascota',
                    'Primer número telefónico', 'Lugar preferido para vacacionar',
                    'Frase preferida de celebridad'), //Esto puede cambiarse por ('1', '2', '3', ...)
                allowNull: true
            },
            securityAnswer:
            {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            isGoogle:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }, { timestamps: false })
}