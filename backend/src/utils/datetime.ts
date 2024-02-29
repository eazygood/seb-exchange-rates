export const getDateWithoutTime = (date?: string) => {
  let now = new Date();
  
  if (date) {
    now = new Date(date);
  }

  now.setHours(0, 0, 0, 0);

  return now;
};
