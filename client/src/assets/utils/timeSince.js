export const timeSince = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? +Math.floor(interval) + " year"
      : +Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? +Math.floor(interval) + " month"
      : +Math.floor(interval) + " monthss";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? +Math.floor(interval) + " day"
      : +Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? +Math.floor(interval) + " hour"
      : +Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? +Math.floor(interval) + " minute"
      : +Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
