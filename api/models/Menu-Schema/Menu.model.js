const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    mainTitle: {
        type: String,
        required: false,
    },
    subHeader: {
        type: String,
        required: false,
    },
    headerDecoration: {
        type: String,
        required: false,
    },
    image: {
        type: String,
    },
    columnContent: [
        { menuItemHeader: String, price: String, menuItemInfo: String },
    ],
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
