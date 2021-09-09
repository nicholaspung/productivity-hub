import * as utils from '../viceUtils';

describe('#ViceUtils', () => {
  it('#transformTimeBetween', () => {
    const timeBetween1 = 1;
    const timeBetween2 = 11;
    expect(utils.transformTimeBetween(timeBetween1)).toEqual('01:00:00');
    expect(utils.transformTimeBetween(timeBetween2)).toEqual('11:00:00');
  });
  it('#lastAccessedText', () => {
    const numOfHours1 = 0;
    const numOfHours2 = 1;
    const numOfHours3 = 4;
    expect(utils.lastAccessedText(numOfHours1)).toEqual(
      'less than an hour ago',
    );
    expect(utils.lastAccessedText(numOfHours2)).toEqual('around 1 hour ago');
    expect(utils.lastAccessedText(numOfHours3)).toEqual('around 4 hours ago');
  });
  it('#getHoursLastAccessed', () => {
    const dateObj = new Date(2021, 1, 2, 5);
    const lastUpdated1 = new Date(2021, 1, 2, 4, 30);
    const lastUpdated2 = new Date(2021, 1, 2, 1, 30);
    expect(utils.getHoursLastAccessed(lastUpdated1, dateObj)).toEqual(0);
    expect(utils.getHoursLastAccessed(lastUpdated2, dateObj)).toEqual(3);
  });
  it('#timeBetweenIsOverBlocker', () => {
    const timeBetween = '02:00:00';
    const lastAccessed1 = 1;
    const lastAccessed2 = 3;
    expect(utils.timeBetweenIsOverBlocker(timeBetween, lastAccessed1)).toEqual(
      true,
    );
    expect(utils.timeBetweenIsOverBlocker(timeBetween, lastAccessed2)).toEqual(
      false,
    );
  });
  it('#sortViceAnalytics', () => {
    const sortThisArray = [
      { vice: { name: 'b' } },
      { vice: { name: 'c' } },
      { vice: { name: 'a' } },
    ];
    sortThisArray.sort(utils.sortViceAnalytics);
    expect(sortThisArray).toEqual([
      { vice: { name: 'a' } },
      { vice: { name: 'b' } },
      { vice: { name: 'c' } },
    ]);
  });
  it('#filterArchivedVicesOut', () => {
    const filterThisArray = [
      { id: 1, vice: { archived: false } },
      { id: 2, vice: { archived: true } },
      { id: 3, vice: { archived: false } },
    ];
    expect(utils.filterArchivedVicesOut(filterThisArray)).toEqual([
      { id: 1, vice: { archived: false } },
      { id: 3, vice: { archived: false } },
    ]);
  });
  it('#cantAccessFunction', () => {
    const analytic1 = {
      frequency: 0,
      last_updated: new Date(2021, 1, 2, 5),
      vice: {
        time_between: '02:00:00',
      },
    };
    const analytic2 = {
      frequency: 1,
      last_updated: new Date(2021, 1, 2, 5),
      vice: {
        time_between: '02:00:00',
      },
    };
    const lastUpdated1 = new Date(2021, 1, 2, 4, 30);
    const lastUpdated2 = new Date(2021, 1, 2, 7, 30);
    expect(utils.cantAccessFunction(analytic1)).toEqual(false);
    expect(utils.cantAccessFunction(analytic2, lastUpdated1)).toEqual(true);
    expect(utils.cantAccessFunction(analytic2, lastUpdated2)).toEqual(false);
  });
  it('#filterUnarchivedVicesOut', () => {
    const filterThisArray = [
      { id: 1, vice: { archived: false } },
      { id: 2, vice: { archived: true } },
      { id: 3, vice: { archived: false } },
    ];
    expect(utils.filterUnarchivedVicesOut(filterThisArray)).toEqual([
      { id: 2, vice: { archived: true } },
    ]);
  });
});
