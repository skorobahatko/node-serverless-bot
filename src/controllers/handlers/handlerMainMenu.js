const axios = require('axios');
const chatBotToken = process.env.TELEGRAM_TOKEN;
const { sendMessage, updateUser } = require('../../services');
const {database} = require('../../database/models');

const handleMainMenu = async (settings) => {
    try {
        const db = database();
        const {chatId, from, text} = settings;
        let options;
        if ([`Дізнатися погоду`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `Введіть назву населеного пункту, або оберіть зі списку, натиснувши на кнопку`,
                reply_markup: {
                    keyboard: [[{text: 'Обрати область'}], [{text: 'До головного меню'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            await updateUser(chatId, {stage: 'weatherMain'}, db);
            await sendMessage(options);
            return {statusCode: 200};
        } else if ([`Історія пошуків`].includes(text)) {
            // options = {
            //     chat_id: chatId,
            //     text: `Тут будуть попередні пошуки`,
            //     reply_markup: {
            //         keyboard: [[{text: 'Заглушка'}]],
            //         one_time_keyboard: true,
            //         resize_keyboard: true
            //     }
            // }
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
        } else if ([`Карта`].includes(text)) {
            // options = {
            //     chat_id: chatId,
            //     text: `Тут буде карта`,
            //     reply_markup: {
            //         keyboard: [[{text: 'Заглушка'}]],
            //         one_time_keyboard: true,
            //         resize_keyboard: true
            //     }
            // }
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
        } else if([`Детальніше`].includes(text)) {
            // options = {
            //     chat_id: chatId,
            //     text: `Тут будуть деталі`,
            //     reply_markup: {
            //         keyboard: [[{text: 'Заглушка'}]],
            //         one_time_keyboard: true,
            //         resize_keyboard: true
            //     }
            // }
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
        return {statusCode: 200};
    } catch (e) {
        console.log(`Er: ${e}`);
    }
}
module.exports = {handleMainMenu};