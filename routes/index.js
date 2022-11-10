const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habitsController = require('../controllers/habits_controller');
const habitLogController = require('../controllers/habitlog_controller');
const Habit = require('../models/habit');
const HabitLog = require('../models/habit_log');

//this function is set to push the daily habits status into habitlogs db
let time = (new Date()).toLocaleTimeString().toString();
// console.log(time);
let hours;
let minutes;
if(time.includes('pm')){
   hours = parseInt(time.split(':')[0]) + 12;
}else{
   hours = parseInt(time.split(':')[0]);
}
minutes = hours*60 + parseInt(time.split(':')[1]);

setTimeout(() => {
   async function pushHistory() {
      try {
         let habits = await Habit.find({});
         // console.log(habits)
         for(let habit of habits){
            HabitLog.create({
               habit: habit._id,
               status: habit.status,
               completionDate: new Date().toLocaleDateString()
            })
         }
      } catch (err) {
         console.log('Error in pushing to history : ', err);
      }
   }
   pushHistory();

   //this function will execute in every interval of 24 hours to create the history of daily habits
   // setInterval(pushHistory, 24*60*60*1000);
   setInterval(pushHistory, 100000);
   // }, (24*60 - minutes-1 )*60*1000);
}, 3000);


router.get('/', homeController.home);
router.post('/habits/create', habitsController.create);
router.get('/habits/delete/:id', habitsController.destroy);
router.get('/habits/status/:habitstatus/:id', habitsController.updateStatus);
router.get('/habits/history', habitLogController.showHistory);


module.exports = router;