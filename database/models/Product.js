module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        prod_name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
    };
    let config = {
        tableName: "products",
        timestamps: false,
    };

    const Product = sequelize.define("Products", cols, config);
   
    return Product;
};