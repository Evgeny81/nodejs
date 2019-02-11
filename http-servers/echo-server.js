require('http')
    .createServer()
    .on('request', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(`ECHO: ${req.url}`);
    })
    .on('error', (error) => {throw new Error(error)})
    .listen(3000);
