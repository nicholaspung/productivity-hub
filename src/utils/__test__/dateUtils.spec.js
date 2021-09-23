import * as utils from '../dateUtils';

describe('#DateUtils', () => {
  it('#getDateTransform', () => {
    const date = new Date(2020, 9, 2);
    expect(utils.getDateTransform(date)).toEqual('2020-10-02');
  });
  it('#getJavascriptDateTransform', () => {
    const date = '2020-10-02';
    expect(utils.getJavascriptDateTransform(date)).toEqual(
      new Date(2020, 9, 2),
    );
  });
  it('#ISOStringToJavascriptDate', () => {
    const date = new Date(2019, 11, 20);
    expect(utils.ISOStringToJavascriptDate(date.toISOString())).toEqual(date);
  });
  it('#getYesterday', () => {
    const date1 = new Date(2019, 0, 5);
    expect(utils.getYesterday(date1)).toEqual(new Date(2019, 0, 4));
    const date2 = new Date(2020, 10, 4);
    expect(utils.getYesterday(date2)).toEqual(new Date(2020, 10, 3));
  });
  it('#getDisplayHourMinTime', () => {
    const time1 = 12 * 60 * 60;
    const timeFactor = 1;
    const time2 = 12 * 60 * 60 * 1000;

    const time3 = 12 * 60 * 60 + 5 * 60 + 12;
    const time4 = time3 * 1000;
    expect(utils.getDisplayHourMinTime(time1, timeFactor)).toEqual([
      '12',
      '00',
    ]);
    expect(utils.getDisplayHourMinTime(time2)).toEqual(['12', '00']);
    expect(utils.getDisplayHourMinTime(time3, timeFactor)).toEqual([
      '12',
      '05',
    ]);
    expect(utils.getDisplayHourMinTime(time4)).toEqual(['12', '05']);
  });
  it('#displayHourMinSecTime', () => {
    const time1 = 12 * 60 * 60;
    const time2 = time1 * 1000;
    const time3 = 12 * 60 * 60 + 5 * 60 + 12;
    const time4 = time3 * 1000;
    expect(utils.displayHourMinSecTime(time1, false)).toEqual('12:00:00');
    expect(utils.displayHourMinSecTime(time2)).toEqual('12:00:00');
    expect(utils.displayHourMinSecTime(time3, false)).toEqual('12:05:12');
    expect(utils.displayHourMinSecTime(time4)).toEqual('12:05:12');
  });
  it('#getSecondsFromStartTimeToEndTime', () => {
    const date1 = new Date(2021, 1, 1, 0, 0);
    const date2 = new Date(2021, 1, 1, 12, 0);
    const date3 = new Date(2021, 1, 1, 18, 0);
    const date4 = new Date(2021, 1, 2, 0, 0);
    const result1 = 12 * 60 * 60;
    const result2 = 6 * 60 * 60;
    expect(utils.getSecondsFromStartTimeToEndTime(date1, date2)).toEqual(
      result1,
    );
    expect(utils.getSecondsFromStartTimeToEndTime(date2, date3)).toEqual(
      result2,
    );
    expect(utils.getSecondsFromStartTimeToEndTime(date3, date4)).toEqual(
      result2,
    );
  });
  it('#getDateFromTimeTrackerTimes', () => {
    const time1 = '12:45 PM';
    const time2 = '05:30 AM';
    const date = utils.getDateTransform(new Date(2021, 5, 1));
    expect(utils.getDateFromTimeTrackerTimes(time1, date)).toEqual(
      new Date(2021, 5, 1, 12, 45),
    );
    expect(utils.getDateFromTimeTrackerTimes(time2, date)).toEqual(
      new Date(2021, 5, 1, 5, 30),
    );
  });
  it('#simplifyDisplayTime', () => {
    const date1 = new Date(2020, 1, 1, 12, 0).toISOString();
    const date2 = new Date(2020, 2, 1, 6, 30).toISOString();
    expect(utils.simplifyDisplayTime(date1)).toEqual('12:00 PM');
    expect(utils.simplifyDisplayTime(date2)).toEqual('06:30 AM');
  });
  it('#sortByTime', () => {
    const date1 = { start_time: new Date(2020, 1, 1).toISOString() };
    const date2 = { start_time: new Date(2020, 2, 1).toISOString() };
    const date3 = { start_time: new Date(2020, 3, 1).toISOString() };
    const arr1 = [date3, date2, date1];
    const arr2 = [date1, date3, date2, date3];
    expect(arr1.sort(utils.sortByTime)).toEqual([date1, date2, date3]);
    expect(arr2.sort(utils.sortByTime)).toEqual([date1, date2, date3, date3]);
  });
});
