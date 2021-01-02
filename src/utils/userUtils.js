export const userAnalyticDates = (analytics) =>
  analytics.reduce((acc, curr) => {
    if (!acc.includes(curr.date)) {
      return [...acc, curr.date];
    }
    return acc;
  }, []);
export const userAnalyticsWithFrequenciesForDate = (analytics) => {
  const dates = [];
  const reducedUserAnalytics = analytics.reduce((acc, curr) => {
    // Finds the earliest and latest date
    if (dates.findIndex((el) => el === curr.date) === -1) {
      dates.push(curr.date);
    }
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
          threshold: curr.threshold && curr.threshold.threshold,
          thresholdId: curr.threshold && curr.threshold.id,
        },
      ];
    }
    // If label is found, add to frequency and also check for threshold
    if (!acc[labelIndex].frequencies[curr.date]) {
      acc[labelIndex].frequencies[curr.date] = curr.frequency;
    }
    if (!acc[labelIndex].threshold && curr.threshold) {
      acc[labelIndex].threshold = curr.threshold.threshold;
      acc[labelIndex].thresholdId = curr.threshold.id;
    }
    return acc;
  }, []);
  const fullFrequenciesUserAnalytic = reducedUserAnalytics.map((analytic) => {
    const analyticCopy = { ...analytic };
    const frequencies = Object.keys(analyticCopy.frequencies);
    if (frequencies.length !== dates.length) {
      dates.forEach((date) => {
        if (frequencies.findIndex((el) => el === date) === -1) {
          analyticCopy.frequencies[date] = 0;
        }
      });
    }
    return analyticCopy;
  });
  return fullFrequenciesUserAnalytic;
};
export const displayDateTransform = (dateStr, shortFlag = false) => {
  const month = dateStr[5] === '0' ? dateStr[6] : dateStr.slice(5, 7);
  const day = dateStr[8] === '0' ? dateStr[9] : dateStr.slice(8, 10);
  if (shortFlag) {
    return day;
  }
  return `${month}/${day}`;
};
export const helperLoggedIn = (data) => {
  const {
    apps,
    user: userId,
    is_anonymous: isAnonymous,
    id: profileId,
    email: dataEmail,
  } = data;
  let userEmail = dataEmail;
  if (isAnonymous) {
    userEmail = 'anonymous@thisisnotareal.email';
  }
  const transformedUser = {
    email: userEmail,
    isAnonymous,
    userId,
    profileId,
  };
  return { transformedUser, apps };
};
export const helperAttachNewThresholdToUserAnalytics = (data, analytics) => {
  const analyticsCopy = [...analytics];
  analyticsCopy.forEach((analytic, i) => {
    if (data.label === analytic.label) {
      const analyticCopy = { ...analytic };
      analyticCopy.threshold = data;
      analyticsCopy[i] = analyticCopy;
    }
  });
  return analyticsCopy;
};
