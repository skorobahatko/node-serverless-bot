const { 
    handlerStart,
    handleMainMenu,
    handleWeatherMain,
    handleWeatherRegion,
    handleWeatherCurrent
} = require("./handlers");
const { 
    findUser, 
    createUser, 
    sendMessage,
    callbackParser 
} = require('../services');
const { database } = require('../database/models');

const webhook = async (body) => {
    try {
        const { message, callback_query } = body,
               db = database();
        let settings
        if (body.callback_query) {
            settings = {
                chatId: callback_query.from.id,
                text: callback_query.message.text,
                info: callback_query.from,
                cb: callback_query.data
            };
            console.log('cb ' + JSON.stringify(settings));
        } else if (body.message) {
            const { text, from, chat, location } = message;
            settings = {
                chatId: chat.id,
                text,
                info: from,
                location
            };
            console.log('msg ' + JSON.stringify(settings));
        }
        let isUserExists = await findUser(settings.info.id, db);
        if (!isUserExists) {
            const options = {
                chat_id: settings.chatId,
                reply_markup: {
                  keyboard: [[{text: 'Continue'}]],
                  one_time_keyboard: true,
                  resize_keyboard: true
                },
                text: `Hi there! Welcome in Ukraine weather bot! To continue press the button^`
            };
            isUserExists = await createUser(
                settings.info.id,
                {
                    first_name: settings.info.first_name,
                    last_name: settings.info.last_name,
                    language: settings.info.language_code,
                    stage: 'greeting'
                }, db);
            console.log(await sendMessage(options));
            return {statusCode: 200};
        }
        let { dataValues: { stage } } = isUserExists;
        console.log(`stage: ${stage}`);
        switch (stage) {
            case 'greeting': 
                await handlerStart(settings);
                break;
            case 'mainMenu':
                await handleMainMenu(settings);
                break;
            case 'weatherMain': 
                await handleWeatherMain(settings);
                break;
            case 'weatherRegion': 
                await handleWeatherRegion(settings);
                break;
            case 'weatherCity':
                await handleWeatherCurrent(settings);
                break;
            default: 
                await handlerStart(settings);
                break;
        }
    return {statusCode: 200};
    }
     catch (e) {
    console.log(`webhook ${e}`)
    }
}
module.exports = {webhook};
