export const getDateTransform = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};
export const getJavascriptDateTransform = (date) =>
  new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10));

export const getYesterday = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

export const ISOStringToJavascriptDate = (date) => new Date(Date.parse(date));
