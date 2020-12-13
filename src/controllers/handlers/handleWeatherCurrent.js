const {actionCity, sendMessage, updateUser, endPoint, weatherCodeParser} = require("../../services");
const {database} = require('../../database/models');

const handleWeatherCurrent = async (settings) => {
    try {
        const db = database();
        const {cb, chatId, from, text} = settings;
        let options;
        if (cb) {
            const city = await actionCity({type: 'oneCity', data: cb});
            if (city) {
                let result = '';
                result = await endPoint(city[0]);
                if (result) {
                    result = await weatherCodeParser(result);
                    options = {
                        chat_id: chatId,
                        text: `${result.name}:\n${result.main}\n${result.temp.temp}`
                    }
                } else {
                    options = {
                        chat_id: chatId,
                        text: `I\'m sorry, u can try write name of city, or press on button to choose a region`,
                        reply_markup: {
                            keyboard: [[{text: 'Choose region'}], [{text: 'Back to main menu'}]],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    }
                    await updateUser(chatId, {stage: 'weatherMain'}, db);
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