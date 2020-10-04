export const helperReplaceObjectInArray = (array, property, data) => {
  const arrayCopy = [...array[property]];
  arrayCopy[array[property].findIndex((el) => el.id === data.id)] = data;
  return arrayCopy;
};

export const helperRemoveObjectFromArray = (array, index) => {
  const arrayCopy = [...array];
  arrayCopy.splice(index, 1);
  return arrayCopy;
};
