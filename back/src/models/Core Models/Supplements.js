const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Supplements",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            isActive:
            {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            imgURL: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            category: {
                type: DataTypes.ENUM("Proteínas", "Creatinas", "Quemadores de grasa", "Aminoácidos", "Pre entreno", "Barras / Alimentos proteicos"),
                allowNull: false,
            },
            flavor: {
                type: DataTypes.ENUM("Frutilla", "Chocolate", "Vainilla", "Banana",),
                allowNull: true,
            },
        },
        { timestamps: false }
    );
};