export const timeDifference = (time1, time2) => {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  const diff = new Date(date2 - date1);

  const SEC = 1000;
  const MIN = 60 * SEC;
  const HRS = 60 * MIN;

  const hrs = String(Math.floor(diff / HRS)).padStart(2, 0);
  const min = String(Math.floor((diff % HRS) / MIN)).padStart(2, 0);

  return `${hrs}:${min}`;
};
