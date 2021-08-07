export const transformTimeBetween = (timeBetween) => {
  if (String(timeBetween).length < 2) {
    return `0${timeBetween}:00:00`;
  }
  return `${timeBetween}:00:00`;
};
export const lastAccessedText = (numOfHours) => {
  let hourText = 'hour';
  const roundedNumOfHours = Math.floor(numOfHours);
  if (roundedNumOfHours > 1) {
    hourText = 'hours';
  }
  if (!roundedNumOfHours) return `less than an ${hourText} ago`;
  return `around ${roundedNumOfHours} ${hourText} ago`;
};
export const getHoursLastAccessed = (lastUpdated, dateObj = new Date()) =>
  Math.floor((dateObj - new Date(lastUpdated)) / (1000 * 60 * 60));
export const timeBetweenIsOverBlocker = (timeBetween, lastAccessed) =>
  parseInt(timeBetween.slice(0, 2), 10) > lastAccessed;
export const sortViceAnalytics = (a, b) => {
  const nameA = a.vice.name.toUpperCase();
  const nameB = b.vice.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};
export const filterArchivedVicesOut = (data) =>
  data.filter((item) => !item.vice.archived);
export const filterUnarchivedVicesOut = (data) =>
  data.filter((item) => item.vice.archived);
export const cantAccessFunction = (analytic, dateObj = new Date()) => {
  if (analytic.frequency === 0) return false;
  const lastAccessed = getHoursLastAccessed(analytic.last_updated, dateObj);
  return timeBetweenIsOverBlocker(analytic.vice.time_between, lastAccessed);
};
