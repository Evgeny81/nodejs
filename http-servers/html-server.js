const fs = require('fs');
require('http')
    .createServer()
    .on('request', (req, res) => {
        const {url} = req;
        res.writeHead(200, { 'Content-Type': 'text/html'});
        if (url === '/index.html') {
            const filePath = './http-servers/index.html';
            const htmlContent = fs.readFileSync(filePath).toString();
            const newContent = htmlContent.replace(/{message}/, 'Hello World!');
            fs.writeFile(filePath, newContent, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            const readStream = fs.createReadStream(filePath);

            readStream.pipe(res);
        }

    })
    .on('error', (error) => {throw new Error(error)})
    .listen(3000);
