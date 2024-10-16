module.exports = (sequelize, DataTypes) => {
    let cols ={
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        password : {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define("Users", cols, config);
    return User;
}