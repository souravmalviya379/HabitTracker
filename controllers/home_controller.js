const Habit = require('../models/habit');

module.exports.home = async function(req, res){
    try{ 
        let habits = await Habit.find({}).sort('timing');
        return res.render('home', {
            habits: habits
        })
    }catch(err){
        console.log('Error : '+err);
        return;
    }
    
}