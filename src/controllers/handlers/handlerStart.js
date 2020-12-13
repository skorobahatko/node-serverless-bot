const {database} = require('../../database/models');
const { updateUser, sendMessage } = require('../../services');

const handlerStart = async (settings) => {
    try {
        console.log(settings);
        const db = database();
        const { chatId, from, text} = settings;
        let options;
        if ([`Continue`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `Choose what u need:`,
                reply_markup: {
                    keyboard: [[{text: 'Weather now'}],[{text: 'History of searches'}],[{text: 'Map'},{text: 'Details'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        } 
        return {statusCode: 200}
    } catch (e) {
        console.log(`ERROR: ${e}`)
        return {statusCode: 200}
    }
}
module.exports = {handlerStart};