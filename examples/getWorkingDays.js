const fs = require('fs');
const path = require('path');

const WorkingDays = require('../src/index');

const array = JSON.parse(fs.readFileSync(path.resolve(__dirname, './example.json')), 'utf-8');

console.log(new WorkingDays({
  includeToday: true,
  verbose: true,
  weekOffDays: [0, 6],
  customHolidays: ['02-12-2019'],
  dateFormat: 'DD-MM-YYYY'
}).getWorkingDays(array));
