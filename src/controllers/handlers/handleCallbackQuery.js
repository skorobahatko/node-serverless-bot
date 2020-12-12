const axios = require('axios');
const chatBotToken = process.env.TELEGRAM_TOKEN;

const handleCallbackQuery = async (callback) => {
    const weather = {
        current: 'cold',
        tomorrow: 'warm',
        yesterday: 'windy'
    }
    const options = {
        answer_query: {
            callback_query_id: callback.id,
            text: weather.current
        }
    }
    console.log('no')
    console.log(options)
    await axios.post(`https://api.telegram.org/bot${chatBotToken}/sendMessage`, options);
    console.log('done')
};

module.exports = {handleCallbackQuery};