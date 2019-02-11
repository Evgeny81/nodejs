const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme', price: 99.99,
    options: [{color: 'blue'}, {size: 'XL'}]
};

require('http')
    .createServer()
    .on('request', (req, res) => {
        const {url} = req;
        res.writeHead(200, {'Content-Type': 'application/json'});
        if (url === '/json') {
            res.end(JSON.stringify(product));
        }

    })
    .on('error', (error) => {
        throw new Error(error);
    })
    .listen(3000);
