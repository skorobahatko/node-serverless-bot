const {actionCity, sendMessage, updateUser} = require("../../services");
const {database} = require('../../database/models');

const handleWeatherCurrent = async (settings) => {
    try {
        const db = database();
        const {cb, chatId, from, text} = settings;
        let options;
        if (cb) {
            const city = await actionCity({type: 'oneCity', data: cb});
            if (city) {
                options = {
                    chat_id: chatId,
                    text: `${city[0]}: weather bad \nor good\ndoesn\'t matter`
                }
                await sendMessage(options);
                options = {
                    chat_id: chatId,
                    text: `Оберіть бажаний пункт меню:`,
                    reply_markup: {
                        keyboard: [[{text: 'Дізнатися погоду'}],[{text: 'Історія пошуків'}],[{text: 'Карта'},{text: 'Деталі'}]],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await sendMessage(options);
                await updateUser(chatId, {stage: 'mainMenu'}, db)
                return {statusCode: 200};
            }
        }
        return {statusCode: 200};
    } catch (e) {
        console.log(e);
        return {statusCode: 200};
    }
}
module.exports = { handleWeatherCurrent };