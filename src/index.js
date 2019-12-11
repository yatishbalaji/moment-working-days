/**
 *  @fileOverview Provides helper functions to play with working days
 *
 *  @author       Yatish Balaji
 *  @author       Darshit Vora
 *  @author       Anish Lushte
 *
 *  @requires     NPM:moment
 */

const moment = require('moment');

/**
 * This is a Moment.js plugin. You can customize the week off days, and also declare custom dates for
 * holidays (eg: public holidays) to exclude them from being counted as working day(s)
 */
class WorkingDays {
    /**
        * Working days Calculator
        * @class
        * @constructor
        * @param {object=} config - Configure includeToday, verbose, weekOffDays, dateFormat, customHolidays
        * @example
        *
        *  const WorkingDays = require('moment-working-days');
        * 
        *  const momentWorkingdays = new WorkingDays({
        *      includeToday: true, // optional. Default true
        *      verbose: true, // optional. Default false
        *      weekOffDays: [0, 6], // optional. Default [0, 6]
        *      dateFormat: 'DD-MM-YYYY', // optional. Default 'YYYY-MM-DD'
        *      customHolidays: ['02-12-2019'], // optional
        *      customWorkingDays: ['07-12-2019'] // optional
        *  })
    */
  constructor(config = {}) {
    const {
        includeToday = true,
        verbose = false,
        weekOffDays = [0, 6],
        customHolidays = [],
        customWorkingDays = [],
        dateFormat = 'YYYY-MM-DD'
    } = config;

    this.includeToday = includeToday;
    this.verbose = verbose;
    this.weekOffDays = weekOffDays;
    this.customHolidays = customHolidays;
    this.customWorkingDays = customWorkingDays;
    this.dateFormat = dateFormat;
  }

    /**
    * Util to calculate working days considering sequence
    * of date(s) - similar to start-stop timer sequence
    * @example
    * momentWorkingdays.isWorkingday("02-12-2019") // Monday
    * // returns 6
    * @example
    * momentWorkingdays.isWorkingday("01-12-2019") // Sunday
    * // returns false
    * @example
    * momentWorkingdays.isWorkingday("06-12-2019") // Friday
    * // returns true
    * @memberof WorkingDays
    * @param   {string} date Date string
    *
    * @returns {boolean} returns if its a working day or not
    */
  isWorkingday(date) {
    date = moment.isMoment(date) ? date : moment(date, this.dateFormat);

    if (
        this.customWorkingDays.some(holiday => moment(holiday, this.dateFormat).isSame(date))
    ) {
        if (this.verbose)
            console.log(date.format(this.dateFormat), 'is a Custom Working Day');
        return true;
    } else if (
        this.weekOffDays.includes(+date.format('d'))
    ) {
        if (this.verbose)
            console.log(date.format(this.dateFormat), 'is a', date.format('ddd'));
        return false;
    } else if (
        this.customHolidays.some(holiday => moment(holiday, this.dateFormat).isSame(date))
    ) {
        if (this.verbose)
            console.log(date.format(this.dateFormat), 'is a Custom Holiday');

        return false;
    }

    return true;
  }

    /**
    * Takes array of dates.
    * @example
    * momentWorkingdays.getWorkingDays([
    *   "29-11-2019", "03-12-2019",
    *   "07-12-2019", "12-12-2019"
    * ])
    * // returns 6
    * @example
    * momentWorkingdays.getWorkingDays([
    *   "29-11-2019", "03-12-2019",
    *   "07-12-2019"
    * ])
    * // returns 3
    * @example
    * momentWorkingdays.getWorkingDays([
    *   "29-11-2019"
    * ])
    * // returns 6
    * @memberof WorkingDays
    * @param   {string[]} data Array of Date string(s)
    *
    * @returns {number} returns number of working days
    */
  getWorkingDays(data) {
    try {
        let tatDays = 0;
        let previousEndDate = null;
    
        if (data.length % 2 !== 0) data.push(new Date());
    
        for (let i = 0; i < data.length - 1; i = i + 2) {
            let start = moment(data[i], this.dateFormat).startOf('day');
            const end = moment(data[i + 1], this.dateFormat).startOf('day');
    
            if (start.isSame(end)) {
                if (!previousEndDate || previousEndDate.isBefore(start)) {
                    tatDays = tatDays + 1;
                }
            } else {
                if (previousEndDate && start.isSameOrBefore(previousEndDate)) {
                    start = moment(previousEndDate).add(1, 'days');
                }
    
                if (start.isSame(end)) {
                    if (!previousEndDate || previousEndDate.isBefore(start)) {
                        tatDays = tatDays + 1;
                    }
                } else {
                    let from = start;
    
                    while (from.isSameOrBefore(end)) {
                        if (this.isWorkingday(from)) {
                            tatDays++;
                        }
    
                        from = moment(from, this.dateFormat).add(1, 'days');
                    }
                }
            }
    
            previousEndDate = end;
        }
    
        if (!this.includeToday && tatDays > 0) tatDays = tatDays - 1;
    
        if (this.verbose) console.log(`Working Days: ${tatDays} day(s)`);
    
        return tatDays;
    } catch (err) {
        if (this.verbose) console.log(err);

        return 0;
    }
  }

    /**
    * Takes date string and number of days.
    * @example
    * momentWorkingdays.addWorkingDays("06-12-2019", 2) // Friday
    * // returns 10-12-2019
    * // Tuesday
    * @memberof WorkingDays
    * @param   {string} date Date string
    * @param   {number} noOfDays Number of days
    *
    * @returns {string} returns date string after adding noOfDays working days
    */
  addWorkingDays(date, noOfDays = 1) {
      try {
        let data = moment(date, this.dateFormat);

        while (noOfDays > 0) {
            const nextDate = data.add(1, 'days');
            data = nextDate;

            if (this.isWorkingday(data)) {
                noOfDays = noOfDays - 1;                
            }
        }

        return data.format(this.dateFormat);
      } catch (err) {
          if (this.verbose) console.error(err);

          return moment().format(this.dateFormat);
      }
  }

  /**
    * Takes date string.
    * @example
    * momentWorkingdays.nextWorkingDay("06-12-2019") // Friday
    * // returns 09-12-2019
    * // Monday
    * @memberof WorkingDays
    * @param   {string} date Date string
    *
    * @returns {string} returns next working day
    */
  nextWorkingDay(date) {
      return this.addWorkingDays(date, 1)
  }

    /**
    * Takes date string and number of days.
    * @example
    * momentWorkingdays.subtractWorkingDays("09-12-2019", 2) // Monday
    * // returns 05-12-2019
    * // Thursday
    * @memberof WorkingDays
    * @param   {string} date Date string
    * @param   {number} noOfDays Number of days
    *
    * @returns {string} returns date string after subtracting noOfDays working days
    */
  subtractWorkingDays(date, noOfDays = 1) {
      try {
        let data = moment(date, this.dateFormat);

        while (noOfDays > 0) {
            const nextDate = data.subtract(1, 'days');
            data = nextDate;

            if (this.isWorkingday(nextDate)) {
                noOfDays = noOfDays - 1;                
            }
        }

        return data.format(this.dateFormat);
      } catch (err) {
          if (this.verbose) console.error(err);

          return moment().format(this.dateFormat);
      }
  }
 /**
    * Takes date string.
    * @example
    * momentWorkingdays.prevWorkingDay("09-12-2019") // Monday
    * // returns 06-12-2019
    * // Friday
    * @memberof WorkingDays
    * @param   {string} date Date string
    *
    * @returns {string} returns previous working day
    */
  prevWorkingDay(date) {
      return this.subtractWorkingDays(date, 1)
  }
  
  /**
    * Sets weekOffDays.
    * @example
    * momentWorkingdays.setWeekOffDays([0, 1, 2, 3, 4, 6])
    * @memberof WorkingDays
    * @param   {string[]} weekOffDays
    * @returns {WorkingDays} returns WorkingDays object
    */
  setWeekOffDays(weekOffDays) {
      this.weekOffDays = weekOffDays;
      return this;
  }  
  /**
    * Sets customWorkingDays.
    * @example
    * momentWorkingdays.customWorkingDays(['07-12-2019'])
    * @memberof WorkingDays
    * @param   {string[]} customWorkingDays
    * @returns {WorkingDays} returns WorkingDays object
    */
  setCustomWorkingDays(customWorkingDays) {
      this.customWorkingDays = customWorkingDays;
      return this;
  }
}

module.exports = WorkingDays;
