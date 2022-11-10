const HabitLog = require('../models/habit_log');

module.exports.showHistory = async function (req, res) {
    try {
       let history = await HabitLog.find({});
       console.log(history)
       return res.render('weekView', {
          history
       });
    } catch (err) {
       console.log('Error in fetching from db: ', err);
    }
 
}