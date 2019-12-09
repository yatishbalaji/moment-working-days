# JSON to Table (HTML)

### Install

`npm install moment-working-days`

### Include

`const WorkingDays = require('moment-working-days')`

### Major Applications
  * TAT (Turn Around Time Calculator)

### Configuration
```
const WorkingDays = require('moment-working-days')

const momentWorkingdays = new WorkingDays({
  includeToday: true,
  verbose: true,
  weekOffDays: [0, 6],
  dateFormat: 'DD-MM-YYYY',
  customHolidays: ['02-12-2019']
})

// includeToday: Include today in calculations, else today wll be excluded

// weekOffDays: Defines weekoff days. Note that week starts with day 0 (Sunday) to day 6 (Saturday).

// dateFormat: Moment Date Format in which dates will be passed

// customHolidays: Defines custom holidays for bussiness (eg: public holidays). Pass an array of dates in configured dateFormat
```

### API

* `.getWorkingDays(<array_of_dates>) => number`
  * calculates count of working days, considering custom holidays and weekoffs.
  * supports distributed date ranges, i.e supports multiple date ranges to be considered for calculation
  * Consider today
  * Weekoffs
  * Public / custom holidays
  * Support moment date formats
  * If you pass only one date in array, it will calculate till today
  * If you pass range of dates, it will calculate after making pair of even and odd indices


```
// Input
[
  "29-11-2019",
  "03-12-2019",
  "07-12-2019"
]

// Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 3 day(s)

// Returns
3

// Explanation
`First it calculates days between 29-11 and 03-12. Then it calculates between 07-12 and today (since length is uneven), hence giving support to distributed date ranges`
```

```
// Input
[
  "29-11-2019",
]

// Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 6 day(s)

// Returns
6
```

* `.isWorkingday(<date>) => boolean`
  * returns if it is a working day, considering custom holidays and weekoffs

```
// Input
"02-12-2019"

// Output
02-12-2019 is a Custom Holiday

// Returns
false
```

```
// Input
"01-12-2019"

// Output
01-12-2019 is a Sun

// Returns
false
```

```
// Input
"06-12-2019"

// Returns
true
```