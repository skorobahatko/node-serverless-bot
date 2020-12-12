
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        telegramId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        stage: {
            type: DataTypes.STRING
        },
        language: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Users'
    });
    return User;
}