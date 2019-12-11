const fs = require('fs');
const path = require('path');

const WorkingDays = require('../src/index');

const array = JSON.parse(fs.readFileSync(path.resolve(__dirname, './example.json')), 'utf-8');

const momentWorkingdays = new WorkingDays({
  includeToday: true, // optional. Default true
  verbose: true, // optional. Default false
  weekOffDays: [0, 6], // optional. Default [0, 6]
  dateFormat: 'DD-MM-YYYY', // optional. Default 'YYYY-MM-DD'
  customHolidays: ['09-12-2019'], // optional
  customWorkingDays: [], // optional
})

console.log('Working Days:', momentWorkingdays.getWorkingDays(array));
console.log('Is Working Day:', momentWorkingdays.isWorkingday('02-12-2019'));
console.log('Add Working Days:', momentWorkingdays.addWorkingDays('06-12-2019', 2));
console.log('Next Working Day:', momentWorkingdays.nextWorkingDay('06-12-2019'));
console.log('Subtract Working Days:', momentWorkingdays.subtractWorkingDays('09-12-2019', 2));
console.log('Previous Working Days:', momentWorkingdays.prevWorkingDay('09-12-2019'));
console.log('Count all Fridays between 2 dates:', momentWorkingdays.setWeekOffDays([
  0, 1, 2, 3, 4, 6
]).getWorkingDays([
  "05-12-2019", "12-12-2019"
]));
console.log('Custom Working Day:', momentWorkingdays.setCustomWorkingDays([
  '08-12-2019'
]).isWorkingday('08-12-2019'));
