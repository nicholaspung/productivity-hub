export const transformTimeBetween = (timeBetween) => {
  if (String(timeBetween).length < 2) {
    return `0${timeBetween}:00:00`;
  }
  return `${timeBetween}:00:00`;
};
export const lastAccessedText = (numOfHours) => {
  let hourText = 'hour';
  if (numOfHours > 1) {
    hourText = 'hours';
  }
  if (!numOfHours) return `less than an ${hourText} ago`;
  return `around ${numOfHours} ${hourText} ago`;
};
export const getHoursLastAccessed = (lastUpdated) =>
  Math.floor((new Date() - new Date(lastUpdated)) / (1000 * 60 * 60));
export const timeBetweenIsOverBlocker = (timeBetween, lastAccessed) =>
  parseInt(timeBetween.slice(0, 2), 10) > lastAccessed;
export const sortViceAnalytics = (a, b) => {
  const nameA = a.vice.name.toUpperCase();
  const nameB = b.vice.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};
