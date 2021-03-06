const axios = require('axios');

const endPoint = async (data) => {
    try {
        // if (data.split(' ').length > 1) {
            // data = data.join('%20');
        //     console.log('true!!!!!!')
        // }
        const url = encodeURI(`http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${process.env.WEATHER_API_TOKEN}&lang=en&units=metric`);
        const result = await axios.get(url);
        if (result.data.cod !== '404') {
            return result.data;
        } else {
            return {error: result.data.message};
        }
    } catch (e) {
        console.log(e);
    };
};
module.exports = { endPoint };