authService = require('./items.service');

module.exports = {
    getItemsByName: (req, res) => {
        res.send('getItemsByName');
    },
    getAllItems: (req, res) => {
        res.send('getAllItems ok');
    },
    getItemDetail: (req, res) => {
        res.send('getItemDetail');
    },
    uploadItem: (req, res) => {
        res.send('uploadItem');
    },
};
