const HabitLog = require('../models/habit_log');
const Habit = require('../models/habit');

module.exports.showHistory = async function (req, res) {
   try {
      let habits = await Habit.find({});
      let habitsCount = habits.length;
      // console.log(habits.length)

      //limiting the result to get only last 6 days data
      let history = await HabitLog.find({}).limit(habitsCount * 6).sort('-createdAt');
      //  console.log(history);
      return res.render('weekView', {
         habits,
         history
      });
   } catch (err) {
      console.log('Error in fetching from db: ', err);
   }

}