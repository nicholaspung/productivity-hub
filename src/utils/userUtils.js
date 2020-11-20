export const userAnalyticDates = (analytics) =>
  analytics.reduce((acc, curr) => {
    if (!acc.includes(curr.date)) {
      return [...acc, curr.date];
    }
    return acc;
  }, []);
export const userAnalyticsWithFrequenciesForDate = (analytics) =>
  analytics.reduce((acc, curr) => {
    // If label is not found
    const labelIndex = acc.findIndex((el) => el.label === curr.label);
    if (labelIndex === -1) {
      return [
        ...acc,
        {
          id: curr.id,
          label: curr.label,
          action: curr.action,
          frequencies: {
            [curr.date]: curr.frequency,
          },
          threshold: curr.threshold.threshold,
        },
      ];
    }
    // If label is found
    if (!acc[labelIndex].frequencies[curr.date]) {
      acc[labelIndex].frequencies[curr.date] = curr.frequency;
    }
    return acc;
  }, []);
export const displayDateTransform = (dateStr, shortFlag = false) => {
  const month = dateStr[5] === '0' ? dateStr[6] : dateStr.slice(5, 7);
  const day = dateStr[8] === '0' ? dateStr[9] : dateStr.slice(8, 10);
  if (shortFlag) {
    return day;
  }
  return `${month}/${day}`;
};
export const helperLoggedIn = (authUser, data) => {
  const { apps, user } = data;
  const updatedAuthUser = { ...authUser, user };
  return { updatedAuthUser, apps };
};
