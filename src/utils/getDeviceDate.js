export function getDeviceDate() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const offset = now.getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const sign = offset > 0 ? "-" : "+";
  const hoursOffset = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const minutesOffset = String(absOffset % 60).padStart(2, '0');
  const formattedOffset = `${sign}${hoursOffset}:${minutesOffset}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${formattedOffset}`;
}