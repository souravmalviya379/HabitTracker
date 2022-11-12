const HabitLog = require('../models/habit_log');
const Habit = require('../models/habit');

module.exports.showHistory = async function (req, res) {
   try {
      let habits = await Habit.find({});
      let habitsCount = habits.length;
      // console.log(habits.length)

      //limiting the result to get only last 6 days data
      let history = await HabitLog.find({})
                     .limit(habitsCount * 6).sort('-createdAt');
      //  console.log(history);
      return res.render('weekView', {
         habits,
         history
      });
   } catch (err) {
      console.log('Error in fetching from db: ', err);
   }

}

module.exports.updateStatus = async function(req, res){
   try{
      let id = req.params.id;
      let status;
      if(req.params.status == 'done'){
         status = 'Done';
      }else if(req.params.status == 'notdone'){
         status = 'Not Done';
      }else{
         status = 'None';
      }
      await HabitLog.updateOne({_id: id}, {status: status});
      
      return res.redirect('back')
   }catch(err){
      console.log('Error in updating status : ', err);
   }
}