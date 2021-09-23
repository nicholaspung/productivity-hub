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

export const getDisplayHourMinTime = (time, timeFactor = 1000) => {
  const hours = `${Math.floor(time / (60 * 60 * timeFactor))}`;
  let mins = Math.floor((time % (60 * 60 * timeFactor)) / (timeFactor * 60));
  if (String(mins).length < 2) {
    mins = `0${mins}`;
  }
  return [hours, mins];
};
export const displayHourMinSecTime = (time, isMilliSeconds = true) => {
  let timeFactor = 1;
  if (isMilliSeconds) {
    timeFactor = 1000;
  }
  const [hours, mins] = getDisplayHourMinTime(time, timeFactor);
  let secs = Math.floor((time % (60 * timeFactor)) / timeFactor);
  if (String(secs).length < 2) {
    secs = `0${secs}`;
  }
  return `${hours}:${mins}:${secs}`;
};

export const getSecondsFromStartTimeToEndTime = (startTime, endTime) => {
  if (!endTime || !startTime) return null;

  return (endTime - startTime) / 1000;
};
export const getDateFromTimeTrackerTimes = (
  time,
  date = getDateTransform(new Date(2021, 1, 1)),
) => {
  if (!time) return null;

  const currentDate = getJavascriptDateTransform(date);
  const timeArr = time.split(':').flatMap((a) => a.split(' '));
  let hourConstant;
  if (timeArr[0] === '12' && timeArr[2][0] === 'P') {
    hourConstant = 0;
  } else if (timeArr[2][0] === 'A') {
    hourConstant = 0;
  } else {
    hourConstant = 12;
  }
  return new Date(
    currentDate.setMinutes(
      (Number(timeArr[0]) + hourConstant) * 60 + Number(timeArr[1]),
    ),
  );
};
export const simplifyDisplayTime = (timeString) => {
  if (!timeString) return null;
  const localeTimeString = new Date(timeString).toLocaleTimeString();
  const splitString = localeTimeString.split(':');
  const firstItem =
    splitString[0].length === 2 ? splitString[0] : `0${splitString[0]}`;
  return `${firstItem}:${splitString[1]} ${splitString[2].substring(3)}`;
};

export const sortByTime = (a, b) => {
  const day1StartTime = new Date(a.start_time);
  const day2StartTime = new Date(b.start_time);
  if (day1StartTime < day2StartTime) {
    return -1;
  }
  if (day1StartTime > day2StartTime) {
    return 1;
  }
  return 0;
};
