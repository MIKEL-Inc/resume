export const getDateFromEpoch = (secondsSinceUTCEpoch: string): Date => {
  const seconds = parseInt(secondsSinceUTCEpoch, 10);
  const date = new Date(0); // Epoch time
  date.setUTCSeconds(seconds);
  return date;
};
