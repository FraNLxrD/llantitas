module.exports=(sequelize, DataTypes)=>{
    let cols={
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING(100),
            allowNull: false
        }
    };
    let config={
        tableName: "sales",
        timestamps: false
    }
    const Sale=sequelize.define("Sales", cols, config);
    Sale.associate= (models)=>{
        Sale.hasMany(models.Users, {
            as: "users",
            foreignKey: "user_id"
        })
    }
    Sale.associate= (models)=>{
        Sale.belongsTo(models.Sales_Products, {
            as: "sales_products",
            foreignKey: "sale_id"
        })
    }
return Sale;
}