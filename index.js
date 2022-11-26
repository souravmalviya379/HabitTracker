const express = require('express');
const env = require('./config/environment');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const Habit = require('./models/habit');
const HabitLog = require('./models/habit_log');
const path = require('path')

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static(path.join(__dirname, env.asset_path)));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());



let time = (new Date()).toLocaleTimeString().toString();
// console.log(time);
let hours;
let minutes;
if (time.includes('pm')) {
    hours = parseInt(time.split(':')[0]) + 12;
} else {
    hours = parseInt(time.split(':')[0]);
}
minutes = hours * 60 + parseInt(time.split(':')[1]);

//this function is set to push the daily habits status into habitlogs db
setTimeout(() => {
    async function pushHistory() {
        try {
            let habits = await Habit.find({});
            // console.log(habits)
            for (let habit of habits) {
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
    setInterval(pushHistory, 24*60*60*1000);
        // setInterval(pushHistory, 100000);

}, (24*60 - minutes - 2)*60*1000);
        // }, 3000);


app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Cannot start server');
    } else {
        console.log('Server running at port : ' + port);
    }
});