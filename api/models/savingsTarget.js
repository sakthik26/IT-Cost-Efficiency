
const mongoose = require('mongoose');

const savingsTargetSchema = new mongoose.Schema({
    customerId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
    customer:
        {
            type: String
        },
    year:
        [{
            totalCost: Number,
            year: Number,
            _id: false
        }],
    description: {
        type: String
    }

});


module.exports = mongoose.model('Savings Target', savingsTargetSchema);