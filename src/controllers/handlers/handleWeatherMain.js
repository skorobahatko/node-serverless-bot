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
        
        if ([`Обрати область`].includes(text)) {
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
                text: `Оберіть область`,
                reply_markup: reply_markup
            }
            await sendMessage(options);     
            await updateUser(chatId, {stage: 'weatherRegion'}, db);
            return {statusCode: 200};
        } else if ([`До головного меню`].includes(text)) {
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
        } else if (text) {
            if (text.match("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z\-]+$")) {
                let cityData = await endPoint(text);
                if (cityData && !cityData.error) {
                    cityData = await weatherCodeParser(cityData);
                    options = {
                        chat_id: chatId,
                        text: `${cityData.name}:\n${cityData.main}\n${cityData.temp.temp}`
                    }
                } else {
                    options = {
                        chat_id: chatId,
                        text: 'Місто не знайдено, спробуйте ще раз,\nабо оберіть область'
                    }
                }
                await sendMessage(options);
                await createRequest(chatId, {request_city: text, request_response: JSON.stringify(cityData)}, db);
                return {statusCode: 200};
            } else {
                options = {
                    chat_id: chatId,
                    text: `Місто введено некоректно,\nспробуйте ще раз`
                }
                await sendMessage(options);     
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