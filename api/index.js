const HTTP = require('http')
const urlSaverAPI = require('./api.UrlSaver')

HTTP.createServer((req, res) => {
    /** 
     * This condition is here because when I send a request with DELETE method 
     * the req.method is set to OPTIONS
     * and for GET or POST the access-control-request-method not exists
     */

    const HttpMethod = req.headers['access-control-request-method'] || req.method

    res.writeHead(200, { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE'
    })

    urlSaverAPI[HttpMethod]({ req, res })
}).listen(3001, () => console.log('API running at http://localhost:3001'))
