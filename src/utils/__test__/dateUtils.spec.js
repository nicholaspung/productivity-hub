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
});
