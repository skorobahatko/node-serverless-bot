module.exports = {
    ...require('./handlerStart'),
    ...require('./handlerMainMenu'),
    ...require('./handleCallbackQuery'),
    ...require('./handleWeatherMain'),
    ...require('./handleWeatherRegion'),
    ...require('./handleWeatherCurrent')
}