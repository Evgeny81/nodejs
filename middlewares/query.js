const parsedQuery = function (req, res, next) {
    const {url} = req;

    const queryStartPosition = url.indexOf('?');
    if (~queryStartPosition) {
        req.parsedQuery = url.slice(queryStartPosition + 1);
    }
    next();
};
module.exports = parsedQuery;
