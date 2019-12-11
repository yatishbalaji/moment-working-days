# Working days calculator - Distributed date ranges
This is a Moment.js plugin that allows you to calculate working days, considering sequence of date(s). You can customize the week off days, and also declare custom dates for holidays (eg: public holidays) to exclude them from being counted as working day(s)

## Installation
----------------------

`npm install --save moment-working-days`

## Major Applications
  * Working Days calculator between Date range(s)
  * TAT (Turn Around Time Calculator)
  * Number of Fridays (or any other day) between Date range(s)

## Configuration
```
const WorkingDays = require('moment-working-days')

const momentWorkingdays = new WorkingDays({
  includeToday: true, // optional. Default true
  verbose: true, // optional. Default false
  weekOffDays: [0, 6], // optional. Default [0, 6]
  dateFormat: 'DD-MM-YYYY', // optional. Default 'YYYY-MM-DD'
  customHolidays: ['02-12-2019'], // optional
  customWorkingDays: [] // optional: eg ['07-12-2019']
})

// includeToday: Include today in calculations, else today wll be excluded

// weekOffDays: Defines weekoff days. Note that week starts with day 0 (Sunday) to day 6 (Saturday).

// dateFormat: Moment Date Format in which dates will be passed

// customHolidays: Defines custom holidays for bussiness (eg: public holidays). Pass an array of dates in configured dateFormat
```

## Documentation
+ Documentation is available at [moment-working-days Docs](https://yatishbalaji.github.io/moment-working-days/index.html).

## API

### getWorkingDays(array_of_dates) => number
  * calculates count of working days, considering custom holidays and weekoffs.
  * supports distributed date ranges, i.e supports multiple date ranges to be considered for calculation
  * Configure if we should consider today in calculation
  * Configure Weekoffs
  * Configure Public / custom holidays
  * Configure ustom working days
  * Support moment date formats
  * Date pairing similiar to Start-Stop timer pairing
  * If you pass only one date in array, it will calculate till today
  * If you pass range of dates, it will calculate after making pair of even and odd indices
  * Supports future dates

#### Example 1
```javascript
> momentWorkingdays.getWorkingDays([
  "29-11-2019", "03-12-2019",
  "07-12-2019", "12-12-2019"
])

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
```javascript
> momentWorkingdays.getWorkingDays([
  "29-11-2019", "03-12-2019",
  "07-12-2019"
])

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
- Eg: pair1: 29-11 and 03-12. pair2: 07-12 and 09-12 (Todays date)
- Hence giving support to distributed date ranges
```

#### Example 3: Calculates working days from 29-11 till today
```javascript
> momentWorkingdays.getWorkingDays([
  "29-11-2019",
])

> Output
30-11-2019 is a Sat
01-12-2019 is a Sun
02-12-2019 is a Custom Holiday
07-12-2019 is a Sat
08-12-2019 is a Sun
Working Days: 6 day(s)

> Returns
6
```

#### Example 4: Count all Fridays between 2 dates
```javascript
> momentWorkingdays.setWeekOffDays([
  0, 1, 2, 3, 4, 6
]).getWorkingDays(["05-12-2019", "12-12-2019"]))

> Output
05-12-2019 is a Thu
07-12-2019 is a Sat
08-12-2019 is a Sun
09-12-2019 is a Mon
10-12-2019 is a Tue
11-12-2019 is a Wed
12-12-2019 is a Thu
Working Days: 1 day(s)

> Returns
1
```
___
### isWorkingday(date) => boolean
  * returns if it is a working day, considering custom holidays and weekoffs

#### Example 1: Custom Holiday
```javascript
> momentWorkingdays.isWorkingday("02-12-2019") // Monday

> Output
02-12-2019 is a Custom Holiday

> Returns
false
```

#### Example 2: WeekOff
```javascript
> momentWorkingdays.isWorkingday("01-12-2019") // Sunday

> Output
01-12-2019 is a Sun

> Returns
false
```

#### Example 3: Weekday
```javascript
> momentWorkingdays.isWorkingday("06-12-2019") // Friday

> Returns
true

```
#### Example 4: Custom working day
```javascript
> momentWorkingdays.setCustomWorkingDays([
  '08-12-2019'
]).isWorkingday('08-12-2019')) // Sunday

> Returns
true
```
___
### addWorkingDays(date, noOfDays) => Date string
  * returns date, after adding noOfDays of working days

#### Example

```javascript
> momentWorkingdays.addWorkingDays("06-12-2019", 2) // Friday

> Output
07-12-2019 is a Sat
08-12-2019 is a Sun

> Returns
10-12-2019 // Tuesday
```
___
### nextWorkingDay(date) => Date string
  * returns next working date

#### Example

```javascript
> momentWorkingdays.nextWorkingDay("06-12-2019") // Friday

> Output
07-12-2019 is a Sat
08-12-2019 is a Sun

> Returns
09-12-2019 // Monday

```
___
### subtractWorkingDays(date, noOfDays) => Date string
  * returns date, after subtracting noOfDays of working days

#### Example

```javascript
> momentWorkingdays.subtractWorkingDays("09-12-2019", 2) // Monday

> Output
08-12-2019 is a Sun
07-12-2019 is a Sat

> Returns
05-12-2019 // Thursday
```
___
### prevWorkingDay(date) => Date string
  * returns previous working day

#### Example

```javascript
> momentWorkingdays.prevWorkingDay("09-12-2019") // Monday

> Output
08-12-2019 is a Sun
07-12-2019 is a Sat

> Returns
06-12-2019  // Friday
```
___

## License

moment-working-days is copyright (c) 2019-present Yatish Balaji <yatishmotamarri@yahoo.com> and
the [contributors to moment-working-days](https://github.com/yatishbalaji/moment-working-days/graphs/contributors).

moment-working-days is free software, licensed under the MIT License. See the
`LICENSE` file for more details.