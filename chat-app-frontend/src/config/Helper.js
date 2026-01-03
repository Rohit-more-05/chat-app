export function timeAgo(date) {
  // always return an absolute local time like '4:31 pm'
  let past = date ? new Date(date) : new Date();
  if (isNaN(past.getTime())) past = new Date();

  return past.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
}
