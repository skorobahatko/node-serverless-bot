
module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        request_city: {
            type: DataTypes.STRING
        },
        request_response: {
            type: DataTypes.JSON
        },
        telegramId: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: 'Requests'
    });
    return Request;
}