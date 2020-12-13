const decoder = (code) => {
    let result = '';
    switch (code) {
        case 200:
            result = 'Гроза з невеликим дощем';
            break;
        case 201: 
            result = 'Гроза з дощем';
            break;
        case 202: 
            result = 'Гроза з сильним дощем';
            break;
        case 210:
            result = 'Легка гроза';
            break;
        case 800:
            result = 'Чисте небо';
            break;
        default: 
            result = 'Чисте небо';
            break;
    }
    return result;
}

const weatherCodeParser = async (data) => {
    try {
        let {weather, main: {temp, feels_like}, wind, clouds, name} = data;
        let description = weather[0].main;
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