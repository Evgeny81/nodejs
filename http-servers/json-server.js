const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb://localhost:27017/', {useNewUrlParser: true});

require('http')
    .createServer()
    .on('request', (req, res) => {
        const {url} = req;
        res.writeHead(200, {'Content-Type': 'application/json'});
        if (url === '/json') {
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                }
                const db = client.db('hw7');
                const collection = db.collection('cities');
                console.log(collection,'collection');
                collection.find().toArray(function (err, results) {
                    res.end(JSON.stringify(results[Math.floor(Math.random()* results.length)]));
                });
            });
        }
    })
    .on('error', (error) => {
        throw new Error(error);
    })
    .listen(3000);
