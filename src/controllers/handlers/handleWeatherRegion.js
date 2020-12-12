const { database } = require("../../database/models");
const { sendMessage, updateUser, actionCity } = require("../../services");

const handleWeatherRegion = async (settings) => {
    try {
        const db = database();
        const {cb, chatId, from, text} = settings;
        let cityesOfRegion = [], options;
        if (cb && [`Оберіть область`].includes(text)) {
            cityesOfRegion = await actionCity({type: 'cityes', data: cb});
            const region = await actionCity({type: 'oneRegion', data: cb});
            options = {
                chat_id: chatId,
                text: region[0],
                reply_markup: {
                    keyboard: [[{text: 'Потрібного міста немає'}],[{text: 'До головного меню'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            await sendMessage(options);
            let inlineButtons = cityesOfRegion.map(el => {
                return [{
                    text: el,
                    callback_data: `${el.slice(0,5)}_cb`
                }]
            })
            let reply_markup = JSON.stringify({
                inline_keyboard: inlineButtons
            });
            options = {
                chat_id: chatId,
                text: `Оберіть місто зі списку:`,
                reply_markup: reply_markup
            }
            await sendMessage(options);
            await updateUser(chatId, {stage: 'weatherCity'}, db);
            return {statusCode: 200};
        } else {
            console.log(cb)
        }
        return {statusCode: 200};
    } catch (e) {
        console.log(e);
    }
};
module.exports = { handleWeatherRegion };