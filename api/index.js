const HTTP = require('http')
const urlSaverAPI = require('./api.UrlSaver')

HTTP.createServer((req, res) => {
    const HttpMethod = req.method

    urlSaverAPI[HttpMethod]({ req, res })
}).listen(3001, () => console.log('API running at http://localhost:3001'))
