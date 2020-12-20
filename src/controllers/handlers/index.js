module.exports = {
    ...require('./handlerStart'),
    ...require('./handlerMainMenu'),
    ...require('./handleHistoryOfSearches'),
    ...require('./handleWeatherMain'),
    ...require('./handleWeatherRegion'),
    ...require('./handleWeatherCurrent')
}