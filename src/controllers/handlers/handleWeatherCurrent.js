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
                    text: `Choose what u need:`,
                    reply_markup: {
                        keyboard: [[{text: 'Weather now'}],[{text: 'History of searches'}],[{text: 'Map'},{text: 'Details'}]],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                console.log(await sendMessage(options));
                await updateUser(chatId, {stage: 'mainMenu'}, db)
                return {statusCode: 200};
            }
        } else if ([`No correct city`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `I\'m sorry, u can try write name of city, or press on button to choose a region`,
                reply_markup: {
                    keyboard: [[{text: 'Choose region'}], [{text: 'Back to main menu'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            console.log(await sendMessage(options));
            await updateUser(chatId, {stage: 'weatherMain'}, db);
        }
        return {statusCode: 200};
    } catch (e) {
        console.log(e);
        return {statusCode: 200};
    }
}
module.exports = { handleWeatherCurrent };