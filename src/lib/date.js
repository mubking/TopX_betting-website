export function formatLargestTimeUnit(serverTime) {
  const serverDate = new Date(serverTime);
  const currentDate = new Date(); // Get current client time

  // Get the difference in seconds
  const durationInSeconds = Math.floor((currentDate - serverDate) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  if (durationInSeconds >= secondsInDay) {
    const days = Math.floor(durationInSeconds / secondsInDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (durationInSeconds >= secondsInHour) {
    const hours = Math.floor(durationInSeconds / secondsInHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (durationInSeconds >= secondsInMinute) {
    const minutes = Math.floor(durationInSeconds / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${durationInSeconds} second${durationInSeconds > 1 ? "s" : ""} ago`;
  }
}
