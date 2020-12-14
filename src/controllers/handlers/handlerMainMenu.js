const axios = require('axios');
const chatBotToken = process.env.TELEGRAM_TOKEN;
const { sendMessage, updateUser, getAllRequests } = require('../../services');
const {database} = require('../../database/models');

const handleMainMenu = async (settings) => {
    try {
        const db = database();
        const {chatId, from, text} = settings;
        let options;
        if ([`🖼 Weather now`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `Write name of city, or press on button to choose a region`,
                reply_markup: {
                    keyboard: [[{text: 'Choose region'}], [{text: 'Back to main menu'}]],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            await updateUser(chatId, {stage: 'weatherMain'}, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        } else if ([`📚 History of searches`].includes(text)) {
            const requests = await getAllRequests(chatId, db);
            if (requests && requests.length) {
                const results = [];
                requests.forEach((el, i) => {
                    const parsedElement = JSON.parse(el.dataValues.request_response)
                    results[i] = `${parsedElement.name} - ${parsedElement.main} - ${parsedElement.temp.temp}`
                });
                options = {
                    chat_id: chatId,
                    text: results.join('\n'),
                    reply_markup: {
                        keyboard: [[{text: '🖼 Weather now'}],[{text: '📚 History of searches'}],[{text: '🗺 Map'},{text: 'Details'}]],
                        resize_keyboard: true
                    }
                }
            } else {
                options = {
                    chat_id: chatId,
                    text: `History of searches is empty.\nChoose what u need:`,
                    reply_markup: {
                        keyboard: [[{text: '🖼 Weather now'}],[{text: '📚 History of searches'}],[{text: '🗺 Map'},{text: 'Details'}]],
                        resize_keyboard: true
                    }
                }
            }
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        } else if ([`🗺 Map`].includes(text)) {
            let reply_markup = JSON.stringify({
                inline_keyboard: [[{text: "World weather online", url: "https://map.worldweatheronline.com/"}]]
            });
            options = {
                chat_id: chatId,
                text: `Press on the url:`,
                reply_markup: reply_markup
            }
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        } else if([`Details`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `This bot was created by @max_skor\nUsed openweather free api\nIn developing used nodejs, aws lambda and serverless framework`,
                reply_markup: {
                    keyboard: [[{text: '🖼 Weather now'}],[{text: '📚 History of searches'}],[{text: '🗺 Map'},{text: 'Details'}]],
                    resize_keyboard: true
                }
            }
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        }
        return {statusCode: 200};
    } catch (e) {
        console.log(`Er: ${e}`);
    }
}
module.exports = {handleMainMenu};