import * as utils from '../habitTrackerUtils';
import { DIRECTIONS, PRIORITIES } from '../../constants/habitTrackerConstants';

describe('#HabitTrackerUtils', () => {
  it('#getDaysInMonth', () => {
    const janDate = new Date(2020, 0, 1);
    const days = 31;
    expect(utils.getDaysInMonth(janDate)).toEqual(days);
  });
  it('#isLeapYear', () => {
    const year1 = 2020;
    expect(utils.isLeapYear(year1)).toEqual(true);
    const year2 = 2000;
    expect(utils.isLeapYear(year2)).toEqual(true);
    const year3 = 1900;
    expect(utils.isLeapYear(year3)).toEqual(false);
  });
  it('#getDaysInYear', () => {
    const leap = new Date(2020, 0, 1);
    expect(utils.getDaysInYear(leap)).toEqual(366);
    const nonLeap = new Date(2019, 0, 1);
    expect(utils.getDaysInYear(nonLeap)).toEqual(365);
  });
  it('#weekArray', () => {
    const array = [];
    for (let i = 0; i < 7; i += 1) {
      array.push(0);
    }
    expect(utils.weekArray().length).toEqual(array.length);
  });
  it('#monthArray', () => {
    const array = [];
    for (let i = 0; i < 28; i += 1) {
      array.push(0);
    }
    // 28
    expect(utils.monthArray(new Date(2019, 1, 1)).length).toEqual(array.length);
    array.push(0);
    // 29
    expect(utils.monthArray(new Date(2020, 1, 1)).length).toEqual(array.length);
    array.push(0);
    // 30
    expect(utils.monthArray(new Date(2020, 3, 1)).length).toEqual(array.length);
    array.push(0);
    // 31
    expect(utils.monthArray(new Date(2020, 0, 1)).length).toEqual(array.length);
  });
  it('#yearArray', () => {
    const array = [];
    for (let i = 0; i < 365; i += 1) {
      array.push(0);
    }
    expect(utils.yearArray(new Date(2019, 0, 1)).length).toEqual(array.length);
    array.push(0);
    expect(utils.yearArray(new Date(2020, 0, 1)).length).toEqual(array.length);
  });
  it('#getFirstDateInWeek', () => {
    const date = new Date(2020, 9, 2);
    const firstDay = new Date(2020, 8, 27);
    expect(utils.getFirstDateInWeek(date)).toEqual(firstDay);
  });
  it('#getFirstDateInMonth', () => {
    const date = new Date(2018, 6, 14);
    const firstDay = new Date(2018, 6, 1);
    expect(utils.getFirstDateInMonth(date)).toEqual(firstDay);
  });
  it('#getFirstDateInYear', () => {
    const date = new Date(2020, 5, 17);
    const firstDay = new Date(2020, 0, 1);
    expect(utils.getFirstDateInYear(date)).toEqual(firstDay);
  });
  it('#changeDate', () => {
    const date = new Date(2020, 9, 2);
    const view1 = utils.VIEWS.WEEK.label;
    expect(utils.changeDate(date, view1, DIRECTIONS.UP)).toEqual(
      new Date(2020, 9, 9),
    );
    expect(utils.changeDate(date, view1, DIRECTIONS.DOWN)).toEqual(
      new Date(2020, 8, 25),
    );

    const view2 = utils.VIEWS.MONTH.label;
    expect(utils.changeDate(date, view2, DIRECTIONS.UP)).toEqual(
      new Date(2020, 10, 2),
    );
    expect(utils.changeDate(date, view2, DIRECTIONS.DOWN)).toEqual(
      new Date(2020, 8, 2),
    );

    const view3 = utils.VIEWS.YEAR.label;
    expect(utils.changeDate(date, view3, DIRECTIONS.UP)).toEqual(
      new Date(2021, 9, 2),
    );
    expect(utils.changeDate(date, view3, DIRECTIONS.DOWN)).toEqual(
      new Date(2019, 9, 2),
    );
  });
  it('#getDayInfo', () => {
    const dailyArray = [
      { finished: true, habit: { archived: false } },
      { finished: false, habit: { archived: false } },
      { finished: true, habit: { archived: false } },
    ];
    expect(utils.getDayInfo(dailyArray)).toEqual([2, 3, 2 / 3]);
    const dailyArray2 = [
      { finished: true, habit: { archived: true } },
      { finished: false, habit: { archived: false } },
      { finished: true, habit: { archived: false } },
    ];
    expect(utils.getDayInfo(dailyArray2)).toEqual([1, 2, 1 / 2]);
  });
  it('#getArrayWithDates', () => {
    const date = new Date(2020, 9, 2);
    const week = utils.getArrayWithDates(
      date,
      utils.weekArray,
      utils.getFirstDateInWeek,
    );
    expect(week[0]).toEqual('2020-09-27');
    expect(week[week.length - 1]).toEqual('2020-10-03');
    const month = utils.getArrayWithDates(
      date,
      utils.monthArray,
      utils.getFirstDateInMonth,
    );
    expect(month[0]).toEqual('2020-10-01');
    expect(month[month.length - 1]).toEqual('2020-10-31');
    const year = utils.getArrayWithDates(
      date,
      utils.yearArray,
      utils.getFirstDateInYear,
    );
    expect(year[0]).toEqual('2020-01-01');
    expect(year[year.length - 1]).toEqual('2020-12-31');
  });
  it('#createFrontEmptyDates', () => {
    const date1 = '2020-10-02';
    expect(utils.createFrontEmptyDates(date1).length).toEqual(4);
    const date2 = '2020-09-15';
    expect(utils.createFrontEmptyDates(date2).length).toEqual(2);
  });
  it('#createBackEmptyDates', () => {
    const date1 = '2020-10-02';
    expect(utils.createBackEmptyDates(date1).length).toEqual(0);
    const date2 = '2020-09-15';
    expect(utils.createBackEmptyDates(date2).length).toEqual(3);
  });
  it('#sortDailies', () => {
    const dailies = [
      { habit: { order: 1 } },
      { habit: { order: 2 } },
      { habit: { order: 0 } },
    ];
    expect(dailies.sort(utils.sortDailies)).toEqual([
      { habit: { order: 0 } },
      { habit: { order: 1 } },
      { habit: { order: 2 } },
    ]);
  });
  it('#sortTodosOrHabits', () => {
    const todos = [{ order: 2 }, { order: 0 }, { order: 1 }];
    expect(todos.sort(utils.sortTodosOrHabits)).toEqual([
      { order: 0 },
      { order: 1 },
      { order: 2 },
    ]);
  });
  it('#transformDailiesForCache', () => {
    expect(
      utils.transformDailiesForCache({}, [
        { date: '2020-10-02', id: 1 },
        { date: '2020-10-03', id: 2 },
        { date: '2020-10-04', id: 3 },
      ]),
    ).toEqual({
      '2020-10-02': [{ date: '2020-10-02', id: 1 }],
      '2020-10-03': [{ date: '2020-10-03', id: 2 }],
      '2020-10-04': [{ date: '2020-10-04', id: 3 }],
    });
  });
  it('#getIdxOfFirstDayForMonthsForYear', () => {
    const display1 = ['2020-01-01'];
    const display2 = ['2021-01-01'];
    const display3 = ['2000-01-01'];
    const display4 = ['2100-01-01'];
    const result1 = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    const result2 = [31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
    expect(utils.getIdxOfFirstDayForMonthsForYear(display1)).toEqual(result2);
    expect(utils.getIdxOfFirstDayForMonthsForYear(display2)).toEqual(result1);
    expect(utils.getIdxOfFirstDayForMonthsForYear(display3)).toEqual(result2);
    expect(utils.getIdxOfFirstDayForMonthsForYear(display4)).toEqual(result1);
  });
  it('#reorderHabitsUtil', () => {
    const daily = { date: '2020-01-01', habit: { id: 1 } };
    const habit = { id: 2 };
    const dailies = [
      { date: '2020-01-01', habit: { id: 1 } },
      { date: '2020-01-01', habit: { id: 2 } },
      { date: '2020-01-01', habit: { id: 3 } },
    ];
    const habits = [{ id: 1 }, { id: 2 }];
    const direction1 = DIRECTIONS.UP;
    const direction2 = DIRECTIONS.DOWN;
    let result = [];
    const apiCall = (a, b) => result.push(a, b);

    result = [];
    utils.reorderHabitsUtil(daily, dailies, habits, direction1, apiCall);
    expect(result).toEqual([]);

    result = [];
    utils.reorderHabitsUtil(daily, dailies, habits, direction2, apiCall);
    expect(result).toEqual([1, 2]);

    result = [];
    daily.habit.id = 2;
    utils.reorderHabitsUtil(daily, dailies, habits, direction2, apiCall);
    expect(result).toEqual([2, 3]);

    result = [];
    daily.habit.id = 3;
    utils.reorderHabitsUtil(daily, dailies, habits, direction2, apiCall);
    expect(result).toEqual([]);

    result = [];
    utils.reorderHabitsUtil(habit, dailies, habits, direction1, apiCall);
    expect(result).toEqual([2, 1]);

    result = [];
    utils.reorderHabitsUtil(habit, dailies, habits, direction2, apiCall);
    expect(result).toEqual([]);
  });
  it('#chosenWeekdays', () => {
    const weekday = 'Mon';
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    expect(utils.chosenWeekdays(weekday, weekdays)).toEqual([
      'Sun',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ]);

    weekdays = ['Sun'];
    expect(utils.chosenWeekdays(weekday, weekdays)).toEqual(['Sun', 'Mon']);
  });
  it('#reorderTodosUtil', () => {
    let data = { id: 4, finished: false, priority: PRIORITIES.NONE };
    const todos = [
      { id: 1, finished: false, priority: PRIORITIES.HIGH },
      { id: 2, finished: true, priority: PRIORITIES.HIGH },
      { id: 3, finished: false, priority: PRIORITIES.NONE },
      { id: 4, finished: false, priority: PRIORITIES.NONE },
      { id: 5, finished: false, priority: PRIORITIES.LOW },
      { id: 6, finished: false, priority: PRIORITIES.LOW },
    ];
    const direction1 = DIRECTIONS.UP;
    const direction2 = DIRECTIONS.DOWN;
    let result = [];
    const apiCall = (a, b) => result.push(a, b);

    result = [];
    utils.reorderTodosUtil(data, todos, direction1, apiCall);
    expect(result).toEqual([data.id, 3]);

    result = [];
    utils.reorderTodosUtil(data, todos, direction2, apiCall);
    expect(result).toEqual([]);

    data = { id: 5, finished: false, priority: PRIORITIES.LOW };

    result = [];
    utils.reorderTodosUtil(data, todos, direction1, apiCall);
    expect(result).toEqual([]);

    result = [];
    utils.reorderTodosUtil(data, todos, direction2, apiCall);
    expect(result).toEqual([data.id, 6]);
  });
  it('#sortedTodosForPriorityUtil', () => {
    const todosArray = [
      { id: 1, order: 0, priority: PRIORITIES.HIGH },
      { id: 2, order: 1, priority: PRIORITIES.NONE },
      { id: 3, order: 2, priority: PRIORITIES.LOW },
      { id: 4, order: 3, priority: PRIORITIES.HIGH },
      { id: 5, order: 4, priority: PRIORITIES.NONE },
      { id: 6, order: 5, priority: PRIORITIES.LOW },
    ];
    expect(utils.sortedTodosForPriorityUtil(todosArray)).toEqual([
      [
        { id: 1, order: 0, priority: PRIORITIES.HIGH },
        { id: 4, order: 3, priority: PRIORITIES.HIGH },
      ],
      [
        { id: 2, order: 1, priority: PRIORITIES.NONE },
        { id: 5, order: 4, priority: PRIORITIES.NONE },
      ],
      [
        { id: 3, order: 2, priority: PRIORITIES.LOW },
        { id: 6, order: 5, priority: PRIORITIES.LOW },
      ],
    ]);
  });
});
