export const getFormattedTime = (sunset: number): string => {
  const date = new Date(sunset);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};
