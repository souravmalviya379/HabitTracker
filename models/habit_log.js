const mongoose = require('mongoose');

const habitLogSchema = mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    },
    status: {
        type: String,
        required: true
    },
    completionDate: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const HabitLog = mongoose.model('HabitLog', habitLogSchema);

module.exports = HabitLog;