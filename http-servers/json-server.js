const MongoClient = require('mongodb').MongoClient;

require('http')
    .createServer()
    .on('request', (req, res) => {
        const {url} = req;
        const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
        res.writeHead(200, {'Content-Type': 'application/json'});
        if (url === '/json') {
            mongoClient.connect(function(err, client){
                if(err){
                    return console.log(err);
                }
                const db = client.db("hw7");
                const collection = db.collection("cities");
                const city = {
                    name: 'Brest',
                    country: 'Belarus',
                    capital: false,
                    location: { lat: 52, long: 23 }
                };
                collection.insertOne(city, function(err, result){
                    if(err){
                        return console.log(err);
                    }
                    console.log(result.ops);
                });
                collection.find().toArray(function(err, results){
                    client.close();
                    res.end(JSON.stringify(results));
                });
            })
        }
    })
    .on('error', (error) => {
        throw new Error(error);
    })
    .listen(3000);
