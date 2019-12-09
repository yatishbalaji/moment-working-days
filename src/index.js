const moment = require('moment');

class WorkingDays {
  constructor(config = {}) {
    const {
        includeToday = true,
        verbose = false,
        weekOffDays = [0, 6],
        customHolidays = ['2019-12-02'],
        dateFormat = 'YYYY-MM-DD'
    } = config;

    this.includeToday = includeToday;
    this.verbose = verbose;
    this.weekOffDays = weekOffDays;
    this.customHolidays = customHolidays;
    this.dateFormat = dateFormat;
  }

  isWorkingday(date) {
    if (
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
}

module.exports = WorkingDays;
