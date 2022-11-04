const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    timing: {
        type: String, 
        required: true
    }
},{
    timestamps: true
}
);

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;