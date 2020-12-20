const axios = require('axios');
const chatBotToken = process.env.TELEGRAM_TOKEN;

const handleHistoryOfSearches = async (settings) => {
    try { 
        const { cb } = settings;
        if (cb) {

        }
    } catch (e) {

    }
};

module.exports = { handleHistoryOfSearches };