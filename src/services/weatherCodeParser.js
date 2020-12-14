const weatherConditionsParser = (condition) => {
    let result = '';
    switch (condition) {
        case 'Thunderstorm':
            result = '⛈ Thunderstorm';
            break;
        case 'Drizzle': 
            result = '🌫 Drizzle';
            break;
        case 'Rain': 
            result = '🌧 Rain';
            break;
        case 'Snow':
            result = '❄️ Snow';
            break;
        case 'Clear':
            result = '☀️ Clear';
            break;
        case 'Clouds':
            result = '☁️ Clouds'
            break;
        case 'Mist':
            result = '🌫 Mist'
            break;
        case 'Smoke':
            result = '🌫 Smoke'
            break;
        default: 
            result = 'secret';
            break;
    }
    return result;
}

const weatherCodeParser = async (data) => {
    try {
        let {weather, main: {temp, feels_like}, wind, clouds, name} = data;
        let description = weatherConditionsParser(weather[0].main);
        temp = Math.floor(temp)
        console.log(weather[0].main)
        let result = {
            name,
            main: description,
            temp: {temp, feels_like},
            wind: wind.speed
        }
        return result
    } catch (e) {
        console.log(e);
    }
};

module.exports = { weatherCodeParser };