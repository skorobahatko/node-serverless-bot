const { database } = require("../../database/models");
const { 
    sendMessage,
    updateUser,
    actionCity,
    endPoint,
    weatherCodeParser,
    createRequest
} = require("../../services");

const handleWeatherMain = async (settings) => {
    try {
        const db = database();
        const {chatId, from, text, cb} = settings;
        let options;
        
        if ([`Choose region`].includes(text)) {
            const regions = await actionCity({type: 'regions', data: {}});
            let inlineButtons = regions.map(el => {
                return [{
                    text: el,
                    callback_data: `${el.slice(0,5)}_cb`
                }]
            })
            let reply_markup = JSON.stringify({
                inline_keyboard: inlineButtons
            });
            console.log(reply_markup);
            options = {
                chat_id: chatId,
                text: `Choose region`,
                reply_markup: reply_markup
            }
            console.log(await sendMessage(options));
            await updateUser(chatId, {stage: 'weatherRegion'}, db);
            return {statusCode: 200};
        } else if ([`Back to main menu`].includes(text)) {
            options = {
                chat_id: chatId,
                text: `Choose what u need:`,
                reply_markup: {
                    keyboard: [[{text: '🖼 Weather now'}],[{text: '📚 History of searches'}],[{text: '🗺 Map'},{text: 'Details'}]],
                    resize_keyboard: true
                }
            }
            console.log(await sendMessage(options));
            await updateUser(chatId, {stage: 'mainMenu'}, db);
            return {statusCode: 200};
        } else if (text) {
            if (text.match("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z\-]"," ")) {
                let cityData = await endPoint(text);
                if (cityData && !cityData.error) {
                    cityData = await weatherCodeParser(cityData);
                    options = {
                        chat_id: chatId,
                        text: `${cityData.name}:\n${cityData.main}\n${cityData.temp.temp}`
                    }
                    await createRequest(chatId, {request_city: text, request_response: JSON.stringify(cityData)}, db);
                } else {
                    options = {
                        chat_id: chatId,
                        text: 'I can\'t find your city, try again,\nor choose a region'
                    }
                }
                console.log(await sendMessage(options));
                return {statusCode: 200};
            } else {
                options = {
                    chat_id: chatId,
                    text: `City wrote uncorrectly,\ntry again, or choose a region`
                }
                console.log(await sendMessage(options));
                // await updateUser(chatId, {stage: 'weatherRegion'}, db);
                return {statusCode: 200};
            }
        }

        return {statusCode: 200};
    } catch (e) {
        console.log(e);
    }
}
module.exports = { handleWeatherMain };