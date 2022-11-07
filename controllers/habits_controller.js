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


module.exports.updateStatus = function(req, res){
    // console.log(req.params)
    let status;
    if(req.params.habitstatus == 'done'){
        status = 'Done';
    }else if(req.params.habitstatus == 'notdone'){
        status = 'Not Done';
    }else{
        status = "None";
    }
    Habit.findByIdAndUpdate(req.params.id, {status: status}, function(err, habit){
        if(err){
            console.log('Error in db while updating status');
        }
        return res.redirect('back');
    });
    
}