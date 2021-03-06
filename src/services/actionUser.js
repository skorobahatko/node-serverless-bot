const axios = require('axios');
const chatBotToken = process.env.TELEGRAM_TOKEN;

async function findUser (telegramId, db) {
    let user;
    try {
        const {User} = db; 
        user = await User.findOne({where: {telegramId}});
    } catch (e) {
        console.log(`Error ${e}`);
    }
    return user;
};

async function createUser (telegramId, body, db) {
    let user;
    try {
        const {User} = db;
        user = await User.create({ ...body, telegramId });
    } catch (e) {
        console.log(e)
    }
    return user;
};

async function updateUser (telegramId, body, db) {
    let checkUser;
    try {
        checkUser = await findUser(telegramId, db);
        if (checkUser) { 
            await checkUser.update({...body, telegramId});
        }
    } catch (e) {
        console.log(e);
    }
    return checkUser;
};

async function createRequest (telegramId, body, db) {
    let request;
    try {
        const {Request} = db;
        request = await Request.create({ ...body, telegramId });
    } catch (e) {
        console.log(e)
    }
    return request;
}

async function getAllRequests (telegramId, db) {
    let results;
    try {
        const {Request} = db;
        results = await Request.findAll({where: {telegramId}})
    } catch (e) {
        console.log(e)
    }
    return results;
}

async function sendMessage (options) {
    try {
        const result = await axios.post(`https://api.telegram.org/bot${chatBotToken}/sendMessage`, options);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    findUser,
    createUser,
    updateUser,
    sendMessage,
    createRequest,
    getAllRequests
};