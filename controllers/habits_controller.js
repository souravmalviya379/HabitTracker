const Habit = require('../models/habit');

module.exports.create = async function(req, res){
    try{
        await Habit.create({
            title: req.body.title,
            status: req.body.status,
            timing: req.body.timing
        });
        return res.redirect('back');
    }catch(err){
        console.log('ERROR : '+err);
        return;
    }
}


module.exports.destroy = async function(req, res){
    try{
        // console.log(req.params.id);
        let habit = await Habit.findById(req.params.id);
        habit.remove();
        console.log('Habit deleted successfully');
        return res.redirect('back');
    }catch(err){
        console.log('Error : ', err);
        return;
    }
}