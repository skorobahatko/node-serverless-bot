const {database} = require('../../database/models');
const { updateUser, sendMessage } = require('../../services');

const handlerStart = async (settings) => {
    try {
        console.log(settings);
        const db = database();
        const { chatId, from, text} = settings;
        let options;
        if ([`Продовжити`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `Оберіть бажаний пункт меню:`,
                reply_markup: {
                    keyboard: [[{text: 'Дізнатися погоду'}],[{text: 'Історія пошуків'}],[{text: 'Карта'},{text: 'Деталі'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            await sendMessage(options);
            return {statusCode: 200};
        } 
        return {statusCode: 200}
    } catch (e) {
        console.log(`ERROR: ${e}`)
        return {statusCode: 200}
    }
}
module.exports = {handlerStart};