const fs = require('fs')
const path = require('path')
const URL = require('url')
const data = require('./urls.json')

const urlSaverRest = {
    'GET': function({ res }) {
        try {
            res.statusCode = 200
            res.end(JSON.stringify(data))            
        } catch (error) {
            res.statusCode = 500
            res.end("Any problem on server has occurred on try get urls from file")            
        }
    },
    'POST': function({ req, res }) {
        req.on('data', (body) => {
            try {
                const { name, url } = JSON.parse(body)
    
                data.urls.push({name, url})

                return writeFile(() => {
                    res.statusCode = 201;
                    res.end("Success to save url")
                })      
            } catch (error) {
                res.statusCode = 500
                res.end("Any problem on server has occurred on try save url on file")
            }
        })
    },
    'DELETE': function({ req, res }) {
        try {
            const { url } = URL.parse(req.url, true).query

            data.urls = data.urls.filter(item => String(item.url) !== url)

            return writeFile(() => {
                res.statusCode = 204
                res.end()
            })
        } catch (error) {
            res.statusCode = 500
            res.end("Any problem on server has occurred on try delete url from file")
        }
    }
}

function writeFile(callback) {
    return fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data, null, 2),
        (err) => {
            if (err) throw err

            callback()
        }
    )
}

module.exports = urlSaverRest