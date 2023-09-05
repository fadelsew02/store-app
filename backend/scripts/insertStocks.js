const Stores = require('../models/stores'); 
const Items = require('../models/items');
const Stocks = require('../models/stocks');

function randomNumber(start, end) {
    return Math.floor(Math.random()*(end - start + 1)) + start;
}


const insertStockData = async () => {
    try {
        const stockData = [
            {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }, {
                store_id: randomNumber(1, 10),
                item_id: randomNumber(1, 90),
                quantity: randomNumber(1, 150)
            }
        ];
        await Stocks.bulkCreate(stockData);

        console.log('Données Stocks insérées avec succès.');
    } catch (error) {
        console.error('Erreur de insertion de données dans Stocks:', error);
    }
};

module.exports = insertStockData;