# Distributed Working days calculator

## Install

`npm install moment-working-days`

## Include

`const WorkingDays = require('moment-working-days')`

## Major Applications
  * TAT (Turn Around Time Calculator)

## Configuration
```
const WorkingDays = require('moment-working-days')

const momentWorkingdays = new WorkingDays({
  includeToday: true, // optional. Default true
  verbose: true, // optional. Default false
  weekOffDays: [0, 6], // optional. Default [0, 6]
  dateFormat: 'DD-MM-YYYY', // optional. Default 'YYYY-MM-DD'
  customHolidays: ['02-12-2019'] // optional
})

// includeToday: Include today in calculations, else today wll be excluded

// weekOffDays: Defines weekoff days. Note that week starts with day 0 (Sunday) to day 6 (Saturday).

// dateFormat: Moment Date Format in which dates will be passed

// customHolidays: Defines custom holidays for bussiness (eg: public holidays). Pass an array of dates in configured dateFormat
```

## API

### getWorkingDays(<array_of_dates>) => number
  * calculates count of working days, considering custom holidays and weekoffs.
  * supports distributed date ranges, i.e supports multiple date ranges to be considered for calculation
  * Consider today
  * Weekoffs
  * Public / custom holidays
  * Support moment date formats
  * If you pass only one date in array, it will calculate till today
  * If you pass range of dates, it will calculate after making pair of even and odd indices
  * Supports future dates

#### Example 1
```
> Input
[
  "29-11-2019",
  "03-12-2019",
  "07-12-2019",
  "12-12-2019"
]

> Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 6 day(s)

> Returns
6

// Explanation
- First it creates pairs of odd and even indexed dates.
- Then, it calculates days within a pair (eg: pair1: 29-11 and 03-12. pair2: 07-12 and 12-12).
- Then, it calculates overall working days.
- Hence giving support to distributed date ranges
```

#### Example 2
```
> Input
[
  "29-11-2019",
  "03-12-2019",
  "07-12-2019"
]

> Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 3 day(s)

> Returns
3

> Explanation
- If number of elements in input array is odd, then it will pair the last date with today
- Eg: pair1: 29-11 and 03-12. pair2: 07-12 and 09-12 (Today's date)
- Hence giving support to distributed date ranges
```

#### Example 3
```
> Input
[
  "29-11-2019",
]

> Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 6 day(s)

> Returns
6

> Explanation
- Calculates working days from 29-11 till today
```
___
### isWorkingday(<date>) => boolean
  * returns if it is a working day, considering custom holidays and weekoffs

#### Example 1
```
> Input
"02-12-2019"

> Output
02-12-2019 is a Custom Holiday

> Returns
false
```

#### Example 2
```
> Input
"01-12-2019"

> Output
01-12-2019 is a Sun

> Returns
false
```

#### Example 3
```
> Input
"06-12-2019"

> Returns
true
```
___
### addWorkingDays(<date>, noOfDays) => Date string
  * returns date, after adding noOfDays of working days

#### Example

```
> momentWorkingdays.addWorkingDays("06-12-2019", 2) // Friday

> Output
07-12-2019 is a Sat
08-12-2019 is a Sun

> Returns
10-12-2019 // Tuesday
```
___
### nextWorkingDay(<date>) => Date string
  * returns next working date

#### Example

```
> momentWorkingdays.nextWorkingDay("06-12-2019") // Friday

> Output
07-12-2019 is a Sat
08-12-2019 is a Sun

> Returns
09-12-2019 // Monday

```
___
### subtractWorkingDays(<date>, noOfDays) => Date string
  * returns date, after subtracting noOfDays of working days

#### Example

```
> momentWorkingdays.subtractWorkingDays("09-12-2019", 2) // Monday

> Output
08-12-2019 is a Sun
07-12-2019 is a Sat

> Returns
05-12-2019 // Thursday
```
___
### prevWorkingDay(<date>) => Date string
  * returns previous working day

#### Example

```
> momentWorkingdays.prevWorkingDay("09-12-2019") // Monday

> Output
08-12-2019 is a Sun
07-12-2019 is a Sat

> Returns
06-12-2019  // Friday
```
___