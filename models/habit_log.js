const mongoose = require('mongoose');

const habitLog = mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    completionDate: {
        type: Date,
        required: true
    }
});